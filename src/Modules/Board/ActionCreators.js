import {
  TICKET_COLUMN_ADD,
  TICKET_COLUMN_REMOVE,
  COLUMN_ADD,
  COLUMN_REMOVE,
  TICKET_SETFORMVISIBILITY,
  COLUMN_REORDER,
  COLUMN_MOVETICKETFROMTO,
  TICKET_REORDER
} from "./Actions";
import uniqid from "uniqid";

export function dispatchAddTicketToColumn(columnid, title, description) {
  return {
    type: TICKET_COLUMN_ADD,
    payload: {
      id: uniqid(),
      columnid,
      title,
      description
    }
  };
}

export function dispatchRemoveTicketFromColumn(columnid, id) {
  return {
    type: TICKET_COLUMN_REMOVE,
    payload: {
      columnid,
      id
    }
  };
}

export function dispatchAddColumn(boardId, title) {
  return {
    type: COLUMN_ADD,
    payload: {
      id: uniqid(),
      boardId: boardId,
      title: title
    }
  };
}

export function dispatchRemoveColumn(boardId, columnId) {
  return {
    type: COLUMN_REMOVE,
    payload: {
      boardId,
      columnId
    }
  };
}

export function dispatchSetTicketFormVisibility(columnId) {
  return {
    type: TICKET_SETFORMVISIBILITY,
    payload: {
      columnId
    }
  };
}

export function dispatchMoveTicketFromColumn(fromColumn, toColumn, ticketId) {
  return {
    type: COLUMN_MOVETICKETFROMTO,
    payload: {
      fromColumn,
      toColumn,
      ticketId
    }
  };
}

export function dispatchReorderColumn(
  boardId,
  columnIdMoveFrom,
  columnIdMoveTo
) {
  return {
    type: COLUMN_REORDER,
    payload: {
      boardId,
      columnIdMoveFrom,
      columnIdMoveTo
    }
  };
}

export function dispatchReorderTicket(
  columnId,
  ticketIdMoveFrom,
  ticketIdMoveTo
) {
  return {
    type: TICKET_REORDER,
    payload: {
      columnId,
      ticketIdMoveFrom,
      ticketIdMoveTo
    }
  };
}
