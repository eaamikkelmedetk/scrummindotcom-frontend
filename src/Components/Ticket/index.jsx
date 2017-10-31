import React from 'react';
import style from './style.css';
import PropTypes from 'prop-types';

const Ticket = (props) => {
    return (
        <div className="ticket">
            <div className="ticket_header">
                <div className="ticket_titleContainer"><h2 className="ticket_titleText">{props.ticket.title}</h2></div>
                <div className="ticket_menuContainer"><i className="ticket_menuIcon material-icons">more_horiz</i></div>
            </div>
            <div className="ticket_body">
                <p className="ticket_bodytext">{props.ticket.description}</p>
            </div>
            <div className="ticket_footer">
                
            </div>
        </div>
    );
};

Ticket.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string
    })
};

export default Ticket;