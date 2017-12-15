import React, { Component } from "react";
import TicketItem from "../TicketItem/TicketItem";

class TicketList extends Component {
  getColumns(ticketIds, ticketEntity, columnId, actions) {
    let ticketsToRender = ticketIds;

    let printTickets = ticketsToRender.map((id, localIndex) => {
      let ticket = ticketEntity[id];
      return (
        <TicketItem
          key={ticket.id}
          {...{ columnId, ticket, localIndex, actions }}
        />
      );
    });

    return printTickets;
  }

  render() {
    const { ticketIds, ticketEntity, actions, columnId } = this.props;
    return (
      <div className="column_tickets">
        {this.getColumns(ticketIds, ticketEntity, columnId, actions)}
      </div>
    );
  }
}

export default TicketList;
