import { ADD_COLUMN, REMOVE_COLUMN } from "./column.actions";
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
