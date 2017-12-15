import {
  TICKET_COLUMN_ADD_SUCCESS,
  TICKET_COLUMN_REMOVE_SUCCESS,
  COLUMN_ADD_SUCCESS,
  COLUMN_UPDATETITLE_SUCCESS,
  COLUMN_REMOVE_SUCCESS,
  TICKET_SETFORMVISIBILITY,
  COLUMN_REORDER_SUCCESS,
  COLUMN_MOVETICKETFROMTO_SUCCESS,
  TICKET_REORDER_SUCCESS,
  BOARD_GET_REQUEST_SUCCESS
} from "./Actions";
import { without, omit, reduce, forOwn } from "lodash";

const initialStateEntities = {
  board: {},
  column: {},
  ticket: {}
};

export const BoardReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
    case BOARD_GET_REQUEST_SUCCESS: {
      const { board, ticket, column } = action.payload;
      return {
        ...state,
        board,
        ticket,
        column
      };
    }
    case "BOARD_GET_REQUEST_FETCHING": {
      const { board, ticket, column } = action.payload;
      return {
        ...state,
        board,
        ticket,
        column
      };
    }
    case "BOARD_GET_REQUEST_FAIL": {
      const { board } = action.payload;
      return {
        ...state,
        board: {
          ...state.board,
          meta: {
            ...state.board.meta,
            error: board.meta.error
          }
        }
      };
    }
    case COLUMN_ADD_SUCCESS: {
      return addColumn(state, action);
    }
    case COLUMN_REMOVE_SUCCESS: {
      return removeColumn(state, action);
    }
    case COLUMN_UPDATETITLE_SUCCESS: {
      return updateColumnTitle(state, action);
    }
    case TICKET_COLUMN_ADD_SUCCESS: {
      return addTicketToColumn(state, action);
    }
    case TICKET_COLUMN_REMOVE_SUCCESS: {
      return removeTicketFromColumn(state, action);
    }
    case COLUMN_REORDER_SUCCESS: {
      return reorderColumn(state, action);
    }
    case TICKET_REORDER_SUCCESS: {
      return reorderTicket(state, action);
    }
    case COLUMN_MOVETICKETFROMTO_SUCCESS: {
      return moveTicketFromTo(state, action);
    }
    default: {
      return state;
    }
  }
};

//Board entity actions---------------------------------->

function addColumn(state, action) {
  const { id, boardId, title } = action.payload;
  return {
    ...state,
    board: {
      ...state.board,
      [boardId]: {
        ...state.board[boardId],
        columns: [...state.board[boardId].columns, id]
      }
    },
    column: {
      ...state.column,
      [id]: {
        id: id,
        title: title,
        tickets: []
      }
    }
  };
}

function addTicketToColumn(state, action) {
  const { columnid, id, title, description } = action.payload;
  return {
    ...state,
    column: {
      ...state.column,
      [columnid]: {
        ...state.column[columnid],
        tickets: [...state.column[columnid].tickets, id]
      }
    },
    ticket: {
      ...state.ticket,
      [id]: {
        id: id,
        title: title,
        description: description
      }
    }
  };
}

function updateColumnTitle(state, action) {
  const { columnid, columnTitle } = action.payload;
  return {
    ...state,
    column: {
      ...state.column,
      [columnid]: {
        ...state.column[columnid],
        title: columnTitle
      }
    }
  };
}

function removeColumn(state, action) {
  const { boardId, columnId } = action.payload;
  return {
    ...state,
    board: {
      ...state.board,
      [boardId]: {
        ...state.board[boardId],
        columns: without(state.board[boardId].columns, columnId)
      }
    },
    column: omit(state.column, columnId)
  };
}

function removeTicketFromColumn(state, action) {
  const { columnid, id } = action.payload;
  const columnTicketArrIndex = state.column[columnid].tickets.indexOf(id);
  return {
    ...state,
    column: {
      ...state.column,
      [columnid]: {
        ...state.column[columnid],
        tickets: [
          ...state.column[columnid].tickets.slice(0, columnTicketArrIndex),
          ...state.column[columnid].tickets.slice(columnTicketArrIndex + 1)
        ]
      }
    },
    ticket: {
      ...state.ticket,
      [id]: omit(state.ticket, id)
    }
  };
}

function reorderColumn(state, action) {
  const { boardId, columnIdMoveFrom, columnIdMoveTo } = action.payload;
  const fromIndex = state.board[boardId].columns.indexOf(columnIdMoveFrom);
  const toIndex = state.board[boardId].columns.indexOf(columnIdMoveTo);
  return {
    ...state,
    board: {
      ...state.board,
      [boardId]: {
        ...state.board[boardId],
        columns: immutablySwapItems(
          state.board[boardId].columns,
          fromIndex,
          toIndex
        )
      }
    }
  };
}

function reorderTicket(state, action) {
  const { columnId, ticketIdMoveFrom, ticketIdMoveTo } = action.payload;
  const fromIndex = state.column[columnId].tickets.indexOf(ticketIdMoveFrom);
  const toIndex = state.column[columnId].tickets.indexOf(ticketIdMoveTo);

  return {
    ...state,
    column: {
      ...state.column,
      [columnId]: {
        ...state.column[columnId],
        tickets: immutablySwapItems(
          state.column[columnId].tickets,
          fromIndex,
          toIndex
        )
      }
    }
  };
}

function moveTicketFromTo(state, action) {
  const { fromColumn, toColumn, ticketId } = action.payload;
  const columnTicketArrIndex = state.column[fromColumn].tickets.indexOf(
    ticketId
  );

  return {
    ...state,
    column: {
      ...state.column,
      [fromColumn]: {
        ...state.column[fromColumn],
        tickets: [
          ...state.column[fromColumn].tickets.slice(0, columnTicketArrIndex),
          ...state.column[fromColumn].tickets.slice(columnTicketArrIndex + 1)
        ]
      },
      [toColumn]: {
        ...state.column[toColumn],
        tickets: [...state.column[toColumn].tickets, ticketId]
      }
    }
  };
}

function immutablySwapItems(items, firstIndex, secondIndex) {
  // Constant reference - we can still modify the array itself
  const results = items.slice();
  const firstItem = items[firstIndex];
  results[firstIndex] = items[secondIndex];
  results[secondIndex] = firstItem;

  return results;
}

const InitialColumnUIState = {
  column: {
    "1": {
      id: 1,
      isTicketFormVisibile: false
    },
    "2": {
      id: 2,
      isTicketFormVisibile: false
    },
    "3": {
      id: 3,
      isTicketFormVisibile: false
    },
    "4": {
      id: 4,
      isTicketFormVisibile: false
    },
    "5": {
      id: 5,
      isTicketFormVisibile: false
    }
  }
};

export const ticketUIReducer = (state = InitialColumnUIState, action) => {
  switch (action.type) {
    case BOARD_GET_REQUEST_SUCCESS:
      const { column } = action.payload;
      let rebuildColumnObjectToUI = {};
      forOwn(column, (value, key) => {
        rebuildColumnObjectToUI[key] = {
          id: value.id,
          isTicketFormVisibile: false
        };
      });
      return {
        ...state,
        column: rebuildColumnObjectToUI
      };
    case COLUMN_ADD_SUCCESS:
      return {
        ...state,
        column: addColumnUI(state.column, action)
      };
    case COLUMN_REMOVE_SUCCESS:
      return {
        ...state,
        column: removeColumnUI(state.column, action)
      };
    case TICKET_SETFORMVISIBILITY:
      return setTicketFormVisibilityUI(state, action);
    default:
      return state;
  }
};

export function addColumnUI(state, action) {
  const { id: columnId } = action.payload;
  return {
    ...state,
    [columnId]: {
      id: columnId,
      isTicketFormVisible: false
    }
  };
}

export function removeColumnUI(state, action) {
  const { columnId } = action.payload;
  return omit(state, columnId);
}

export function setTicketFormVisibilityUI(state, action) {
  const { columnId } = action.payload;
  return {
    column: reduce(
      state.column,
      (result, value, key) => {
        if (key === columnId.toString()) {
          value.isTicketFormVisibile = !value.isTicketFormVisibile;
        } else {
          value.isTicketFormVisibile = false;
        }

        result[key] = value;
        return result;
      },
      {}
    )
  };
}
