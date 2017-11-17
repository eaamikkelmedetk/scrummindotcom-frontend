import React from "react";
import style from "./TicketStyle.css";

const Ticket = props => {
  const { handleTicketRemove, ticket: { id: ticketId, title, description } } = props;

  return (
    <div className="ticket">
      <div className="ticket_header">
        <div className="ticket_titleContainer">
          <h2 className="ticket_titleText">{title}</h2>
        </div>
        <div className="ticket_menuContainer">
          <i onClick={() => handleTicketRemove(ticketId)} className="ticket_menuIcon material-icons">
            close
          </i>
        </div>
      </div>
      <div className="ticket_body">
        <p className="ticket_bodytext">{description}</p>
      </div>
      <div className="ticket_footer" />
    </div>
  );
};

export default Ticket;
