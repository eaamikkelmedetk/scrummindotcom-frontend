import React from "react";
import style from "../column.style.css";
import classnames from "classnames";
import TicketContainer from "../../Ticket/TicketContainer/TicketContainer";

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
      actions: { dispatchRemoveColumn: handleRemoveColumn }
    } = this.props;

    const { isShowActions } = this.state;

    return (
      <div className="column">
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
        <TicketContainer {...{ columnId, ticketIds: tickets }} />
      </div>
    );
  }
}

export default ColumnItem;
