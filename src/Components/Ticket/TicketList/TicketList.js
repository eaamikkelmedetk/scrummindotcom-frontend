import React from "react";
import TicketItem from "../TicketItem/TicketItem";

class TicketList extends React.Component {
  getColumns() {
    const { ticketIds, ticketEntity, actions, columnId } = this.props;

    let ticketsToRender = ticketIds;

    let printTickets = ticketsToRender.map((id, localIndex) => {
      let ticket = ticketEntity[id];
      return ticket !== undefined ? (
        <TicketItem
          key={ticket.id}
          {...{ columnId, ticket, localIndex, actions }}
        />
      ) : (
        <div>Hej</div>
      );
    });

    return printTickets;
  }
  render() {
    return <div className="column_tickets">{this.getColumns()}</div>;
  }
}

export default TicketList;
