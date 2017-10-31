import React from 'react';
import Ticket from './../Ticket'
import style from './style.css';
import PropTypes from 'prop-types';

const Column = (props) => {

    let getTickets = props.column.tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket}></Ticket>);

    return (
        <div className="column">
            <div className="column_headerContainer">
                <h2 className="column_title">{props.column.title}</h2>
            </div>
            <div className="column_tickets">
                {getTickets}
            </div>
        </div>
    );
};

Column.propTypes = {
    column: PropTypes.object,
    column: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    }),
    tickets: PropTypes.array
};

export default Column;