import {
  ADD_TICKET_TO_COLUMN,
  REMOVE_TICKET_FROM_COLUMN,
  ADD_COLUMN,
  REMOVE_COLUMN,
  SET_TICKETFORMVISIBILITY,
  REORDER_COLUMN,
  MOVE_TICKET_TO_COLUMN,
  REORDER_TICKET
} from "./Actions";
import uniqid from "uniqid";

export function dispatchAddTicketToColumn(columnid, title, description) {
  return {
    type: ADD_TICKET_TO_COLUMN,
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
    type: REMOVE_TICKET_FROM_COLUMN,
    payload: {
      columnid,
      id
    }
  };
}

export function dispatchAddColumn(boardId, title) {
  return {
    type: ADD_COLUMN,
    payload: {
      id: uniqid(),
      boardId: boardId,
      title: title
    }
  };
}

export function dispatchRemoveColumn(boardId, columnId) {
  return {
    type: REMOVE_COLUMN,
    payload: {
      boardId,
      columnId
    }
  };
}

export function dispatchSetTicketFormVisibility(columnId) {
  return {
    type: SET_TICKETFORMVISIBILITY,
    payload: {
      columnId
    }
  };
}

export function dispatchMoveTicketFromColumn(fromColumn, toColumn, ticketId) {
  return {
    type: MOVE_TICKET_TO_COLUMN,
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
    type: REORDER_COLUMN,
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
    type: REORDER_TICKET,
    payload: {
      columnId,
      ticketIdMoveFrom,
      ticketIdMoveTo
    }
  };
}
