import React from "react";
import style from "../column.style.css";
import classnames from "classnames";
import TicketContainer from "../../Ticket/TicketContainer/TicketContainer";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { flow } from "lodash";

const Types = {
  TICKET: "ticket",
  COLUMN: "column"
};

const columnSource = {
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
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

const ColumnTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();

    const { fromColumn } = item;
    const { column: { id: toColumn } } = props;

    let dropIsAllowed = fromColumn !== toColumn;

    return dropIsAllowed;
  },
  drop(props, monitor, component) {
    const itemType = monitor.getItemType();
    if (itemType === Types.TICKET) {
      const item = monitor.getItem();

      const { ticketId, fromColumn } = item;

      const {
        column: { id: toColumn },
        actions: { dispatchMoveTicketFromColumn }
      } = props;

      dispatchMoveTicketFromColumn(fromColumn, toColumn, ticketId);
    } else if (itemType === Types.COLUMN) {
      const {
        localIndex: fromLocalIndex,
        columnId: fromColumnId,
        fromBoard
      } = monitor.getItem();
      const {
        actions: { dispatchReorderColumn },
        localIndex: toLocalIndex,
        boardId,
        column: { id: toColumnId }
      } = props;

      const dragIndex = fromLocalIndex;
      const hoverIndex = toLocalIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.right;

      if (dragIndex >= hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Dragging upwards
      if (dragIndex <= hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      dispatchReorderColumn(boardId, fromColumnId, toColumnId);
    }
  }
};

function collectTarget(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    itemType: monitor.getItemType(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver({ shallow: true }),
    sourceOffSet: monitor.getSourceClientOffset(),
    pointerCoordinates: monitor.getClientOffset()
  };
}

class ColumnItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowActions: false
    };

    this.handleHeaderActionsVisibility = this.handleHeaderActionsVisibility.bind(
      this
    );
  }

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

  handleHeaderActionsVisibility(e) {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowActions: !prevState.isShowActions
      };
    });

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

  render() {
    const {
      boardId,
      column: { title: columnTitle, id: columnId, tickets },
      actions: { dispatchRemoveColumn: handleRemoveColumn },
      connectDragSource,
      connectDropTarget,
      isOver,
      canDrop,
      itemType,
      pointerCoordinates,
      sourceOffSet
    } = this.props;
    const { isShowActions } = this.state;

    return connectDragSource(
      connectDropTarget(
        <div
          className={classnames(
            "column",
            {
              "column--ticketIsOver":
                isOver && canDrop && itemType === Types.TICKET
            }
            // {
            //   "column--anotherColumnIsOverLeft":
            //     isOver &&
            //     canDrop &&
            //     itemType === Types.COLUMN &&
            //     (sourceOffSet.x === 0 ? 100 : 0) < pointerCoordinates.x
            // },
            // {
            //   "column--anotherColumnIsOverRight":
            //     isOver &&
            //     canDrop &&
            //     itemType === Types.COLUMN &&
            //     sourceOffSet.x > pointerCoordinates.x
            // }
          )}>
          <div
            ref={el => (this.headerContainer = el)}
            className="column_headerContainer">
            <div
              className={classnames("column_header", {
                "column_header--hover": isShowActions
              })}>
              <h2 className="column_title">{columnTitle}</h2>
            </div>
            <div className="column_actions">
              <i
                onClick={() => handleRemoveColumn(boardId, columnId)}
                className="material-icons actions_delete">
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
      )
    );
  }
}

export default flow(
  DragSource(Types.COLUMN, columnSource, collectSource),
  DropTarget([Types.COLUMN, Types.TICKET], ColumnTarget, collectTarget)
)(ColumnItem);
