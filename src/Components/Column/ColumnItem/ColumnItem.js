import React from "react";
import classnames from "classnames";
import TicketContainer from "../../Ticket/TicketContainer/TicketContainer";
import { DragSource, DropTarget } from "react-dnd";
import { Field, reduxForm } from "redux-form";
import { flow } from "lodash";
import PropTypes from "prop-types";
import { TICKET, COLUMN } from "../../../Modules/Board/DragAndDropTypes";
import "./columnitem.style.css";

const ColumnSource = {
  beginDrag(props, monitor, component) {
    const item = {
      columnId: props.column.id,
      boardId: props.boardId,
      localIndex: props.localIndex
    };
    return item;
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const ColumnTarget = {
  canDrop(props, monitor) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem();

    let dropIsAllowed;

    if (itemType === TICKET) {
      const { fromColumn } = item;
      const { column: { id: toColumn } } = props;
      dropIsAllowed = fromColumn !== toColumn;
    }

    if (itemType === COLUMN) {
      const { localIndex: fromIndex } = item;
      const { localIndex: toIndex } = props;

      dropIsAllowed = fromIndex !== toIndex;
    }

    return dropIsAllowed;
  },
  drop(props, monitor, component) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem();

    if (itemType === TICKET) {
      const { ticketId, fromColumn } = item;

      const {
        column: { id: toColumn },
        actions: { dispatchMoveTicketFromColumn }
      } = props;

      dispatchMoveTicketFromColumn(fromColumn, toColumn, ticketId);
    }
  },
  hover(props, monitor, component) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem();
    if (itemType === COLUMN) {
      const { columnId: fromColumnId } = item;

      const {
        actions: { dispatchReorderColumn },
        boardId,
        column: { id: toColumnId }
      } = props;

      dispatchReorderColumn(boardId, fromColumnId, toColumnId);
    }
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver()
  };
}

class ColumnItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowActions: false,
      isColumnEditable: false
    };

    this.handleHeaderActionsVisibility = this.handleHeaderActionsVisibility.bind(
      this
    );
    this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
  }

  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    boardId: PropTypes.number.isRequired,
    column: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.headerContainer.addEventListener(
      "click",
      this.handleHeaderActionsVisibility
    );
  }

  componentWillUnmount() {
    this.headerContainer.removeEventListener(
      "click",
      this.handleHeaderActionsVisibility
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.columnTitleField !== undefined) {
      const columnTitleField = this.refs.columnTitleField.getRenderedComponent();
      const fieldLen = columnTitleField.value.length * 2;
      columnTitleField.focus();
      columnTitleField.setSelectionRange(fieldLen, fieldLen);
    }
  }

  handleEditColumnTitleVisibility() {
    this.setState(prevState => {
      return {
        ...prevState,
        isColumnEditable: !prevState.isColumnEditable
      };
    });
  }

  saveColumnTitle(values) {
    const {
      actions: { dispatchUpdateColumnTitle },
      column: { id }
    } = this.props;
    const { columnTitleField } = values;
    dispatchUpdateColumnTitle(id, columnTitleField);
  }

  handleHeaderActionsVisibility(e) {
    if (this.state.isColumnEditable === false) {
      this.setState(prevState => {
        return {
          ...prevState,
          isShowActions: !prevState.isShowActions
        };
      });
    }

    if (this.state.isShowActions === true) {
      this.headerContainer.addEventListener(
        "mouseleave",
        this.handleHeaderActionsVisibility
      );
    } else {
      this.headerContainer.removeEventListener(
        "mouseleave",
        this.handleHeaderActionsVisibility
      );
    }
  }

  renderColumnHeader(isColumnEditable, columnId, columnTitle, handleSubmit) {
    if (isColumnEditable) {
      return (
        <Field
          name="columnTitleField"
          autoComplete="off"
          className="formTextField inputBlock columnTitleFormInput"
          component="input"
          onKeyUp={event => {
            let keyCode = event.keyCode;
            if (keyCode === 13) {
              handleSubmit(this.saveColumnTitle.bind(this))();
              this.handleEditColumnTitleVisibility();
            }
          }}
          ref="columnTitleField"
          withRef
          type="text"
        />
      );
    }

    return <h2 className="column_title">{columnTitle}</h2>;
  }

  handleRemoveColumn(dispatchRemoveColumn, boardId, columnId, ticketsLen) {
    const hasTickets = ticketsLen > 0;

    if (!hasTickets) {
      dispatchRemoveColumn(boardId, columnId);
      return;
    }

    const shouldDeleteAnyway = window.confirm(
      "Column contains tickets, if removed the tickets will be deleted. Do you want to remove the column anyway?"
    );

    if (!shouldDeleteAnyway) {
      return;
    }

    dispatchRemoveColumn(boardId, columnId);
  }

  render() {
    const {
      boardId,
      column: { title: columnTitle, id: columnId, tickets },
      actions: { dispatchRemoveColumn },
      handleSubmit,
      connectDragSource,
      connectDropTarget,
      isOver,
      canDrop,
      itemType
    } = this.props;

    const ticketsLen = tickets.length;

    const { isColumnEditable, isShowActions } = this.state;

    return connectDragSource(
      connectDropTarget(
        <div>
          <div
            className={classnames("column", {
              "column--ticketIsOver": isOver && canDrop && itemType === TICKET
            })}>
            <div
              ref={el => (this.headerContainer = el)}
              className="column_headerContainer">
              <div
                className={classnames("column_header", {
                  "column_header--hover": isShowActions
                })}>
                {this.renderColumnHeader(
                  isColumnEditable,
                  columnId,
                  columnTitle,
                  handleSubmit
                )}
              </div>
              <div className="column_actions">
                <div className="action_shadow" />
                <i
                  onClick={() => this.handleEditColumnTitleVisibility()}
                  className="material-icons action action--blue">
                  mode_edit
                </i>
                <i
                  onClick={() => {
                    this.handleRemoveColumn(
                      dispatchRemoveColumn,
                      boardId,
                      columnId,
                      ticketsLen
                    );
                  }}
                  className="material-icons action action--red">
                  remove_circle_outline
                </i>
              </div>
            </div>
            <TicketContainer
              {...{
                columnId,
                ticketIds: tickets
              }}
            />
          </div>
        </div>
      )
    );
  }
}
export default flow(
  DragSource(COLUMN, ColumnSource, collectSource),
  DropTarget([COLUMN, TICKET], ColumnTarget, collectTarget),
  reduxForm()
)(ColumnItem);
