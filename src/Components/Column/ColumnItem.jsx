import React from "react";
import TicketItem from "../Ticket/TicketItem";
import style from "./ColumnStyle.css";
import TicketForm from "../TicketForm/TicketForm";
import classnames from "classnames";
import ButtonItem from "../Button/ButtonItem";

class ColumnItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowActions: false
    };

    this.handleTicketFormVisibility = this.handleTicketFormVisibility.bind(this);
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleTicketRemove = this.handleTicketRemove.bind(this);
    this.handleHeaderActionsVisibility = this.handleHeaderActionsVisibility.bind(this);
  }

  componentDidMount() {
    this.headerContainer.addEventListener("click", this.handleHeaderActionsVisibility);
  }

  componentWillUnmount() {
    this.headerContainer.removeEventListener("click", this.handleHeaderActionsVisibility);
  }

  getTickets() {
    const { column: { tickets } } = this.props;
    if (tickets.length > 0) {
      return tickets.map(ticket => (
        <TicketItem
          key={ticket.id}
          handleTicketRemove={(e, data) => this.handleTicketRemove(e, data)}
          ticket={ticket}
        />
      ));
    } else {
      return <div>This column is empty</div>;
    }
  }

  handleTicketFormVisibility(e) {
    const { onTicketFormVisibilityChange, column: { id: columnId }, isTicketFormVisible } = this.props;
    onTicketFormVisibilityChange(columnId);
  }

  handleTicketRemove(data) {
    const { dispatchRemoveTicketFromColumn, column: { id: columnId } } = this.props;
    dispatchRemoveTicketFromColumn(columnId, data);
  }

  handleOnAdd(values) {
    const { column: { id: columnId }, dispatchAddTicketToColumn } = this.props;
    const { title, description } = values;

    dispatchAddTicketToColumn(columnId, title, description);
    this.handleTicketFormVisibility();
  }

  handleHeaderActionsVisibility(e) {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowActions: !prevState.isShowActions
      };
    });
    if (this.state.isShowActions === true) {
      this.headerContainer.addEventListener("mouseleave", this.handleHeaderActionsVisibility);
    } else {
      this.headerContainer.removeEventListener("mouseleave", this.handleHeaderActionsVisibility);
    }
  }

  render() {
    const {
      isTicketFormVisible,
      boardId,
      column: { title: columnTitle, id: columnId },
      dispatchRemoveColumn: handleRemoveColumn
    } = this.props;
    const { isShowActions } = this.state;
    return (
      <div className="column">
        <div ref={el => (this.headerContainer = el)} className="column_headerContainer">
          <div className={classnames("column_header", { "column_header--hover": isShowActions })}>
            <h2 className="column_title">{columnTitle}</h2>
          </div>
          <div className="column_actions">
            <i onClick={() => handleRemoveColumn(boardId, columnId)} className="material-icons actions_delete">
              remove_circle_outline
            </i>
          </div>
        </div>
        <div className="column_tickets">{this.getTickets()}</div>
        <div
          style={{
            backgroundColor: isTicketFormVisible ? "#FAFAFA" : "transparent",
            borderTop: isTicketFormVisible ? "1px solid black" : "0"
          }}
          className="column_ticketForm">
          {isTicketFormVisible ? (
            <TicketForm onAdd={this.handleOnAdd} onCancel={this.handleTicketFormVisibility} />
          ) : (
            <ButtonItem style={{ width: "90%" }} onClick={this.handleTicketFormVisibility} color="blue">
              Add ticket
            </ButtonItem>
          )}
        </div>
      </div>
    );
  }
}

export default ColumnItem;
