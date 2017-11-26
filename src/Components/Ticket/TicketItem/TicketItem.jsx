import React from "react";
import style from "../ticket.style.css";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import { flow } from "lodash";

const Types = {
  TICKET: "ticket"
};

const ticketSource = {
  beginDrag(props, monitor, component) {
    const item = {
      ticketId: props.ticket.id,
      fromColumn: props.columnId,
      localIndex: props.localIndex
    };
    return item;
  },

  isDragging(props, monitor) {
    return monitor.getItem().fromColumn !== props.fromColumn;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return monitor.getDropResult();
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

const ticketTarget = {
  canDrop(props, monitor, component) {
    const { fromLocalIndex } = monitor.getItem();
    const { localIndex: toLocalIndex } = props;

    return fromLocalIndex !== toLocalIndex;
  },
  hover(props, monitor, component) {
    const {
      localIndex: fromLocalIndex,
      ticketId: fromTicketId,
      fromColumn
    } = monitor.getItem();
    const {
      actions: { dispatchReorderTicket },
      localIndex: toLocalIndex,
      columnId: toColumn,
      ticket: { id: toTicketId }
    } = props;

    const dragIndex = fromLocalIndex;
    const hoverIndex = toLocalIndex;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex <= hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex >= hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (fromColumn !== toColumn) {
      return;
    }

    dispatchReorderTicket(toColumn, fromTicketId, toTicketId);
  }
};

function collectTarget(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}

class TicketItem extends React.Component {
  render() {
    const {
      ticket: { id: ticketId, title, description },
      columnId,
      actions: { dispatchRemoveTicketFromColumn },
      connectDragSource,
      connectDropTarget,
      isOver,
      canDrop
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
  DragSource(Types.TICKET, ticketSource, collectSource),
  DropTarget(Types.TICKET, ticketTarget, collectTarget)
)(TicketItem);
