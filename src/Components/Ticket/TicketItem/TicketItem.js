import React, { Component } from "react";
import "./ticketitem.style.css";
import { DragSource, DropTarget } from "react-dnd";
import { flow } from "lodash";
import { TICKET } from "../../../Modules/Board/DragAndDropTypes";
import PropTypes from "prop-types";

const ticketSource = {
  beginDrag(props, monitor, component) {
    const item = {
      ticketId: props.ticket.id,
      fromColumn: props.columnId,
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

const ticketTarget = {
  canDrop(props, monitor, component) {
    const { fromLocalIndex } = monitor.getItem();
    const { localIndex: toLocalIndex } = props;

    return fromLocalIndex !== toLocalIndex;
  },
  hover(props, monitor, component) {
    const { ticketId: fromTicketId, fromColumn } = monitor.getItem();
    const {
      actions: { dispatchReorderTicket },
      columnId: toColumn,
      ticket: { id: toTicketId }
    } = props;

    if (fromColumn !== toColumn) {
      return;
    }

    dispatchReorderTicket(toColumn, fromTicketId, toTicketId);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType()
  };
}

class TicketItem extends Component {
  static propTypes = {
    ticket: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    columnId: PropTypes.number.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  render() {
    const {
      ticket: { id: ticketId, title, description },
      columnId,
      actions: { dispatchRemoveTicketFromColumn },
      connectDragSource,
      connectDropTarget
    } = this.props;

    const handleTicketRemove = data => {
      dispatchRemoveTicketFromColumn(columnId, data);
    };

    return connectDragSource(
      connectDropTarget(
        <div className="ticket">
          <div className="ticket_header">
            <div className="ticket_titleContainer">
              <h2 className="ticket_titleText">{title}</h2>
            </div>
            <div className="ticket_menuContainer">
              <i
                onClick={() => handleTicketRemove(ticketId)}
                className="ticket_menuIcon material-icons">
                close
              </i>
            </div>
          </div>
          <div className="ticket_body">
            <p className="ticket_bodytext">{description}</p>
          </div>
          <div className="ticket_footer" />
        </div>
      )
    );
  }
}

export default flow(
  DragSource(TICKET, ticketSource, collectSource),
  DropTarget(TICKET, ticketTarget, collectTarget)
)(TicketItem);
