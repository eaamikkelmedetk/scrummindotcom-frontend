import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  MOVE_TICKET_TO_COLUMN,
  REORDER_COLUMN
} from "./column.actions";
import uniqid from "uniqid";

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
