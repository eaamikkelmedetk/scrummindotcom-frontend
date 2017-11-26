import {
  ADD_TICKET_TO_COLUMN,
  REMOVE_TICKET_FROM_COLUMN,
  ADD_COLUMN,
  REMOVE_COLUMN,
  SET_TICKETFORMVISIBILITY,
  REORDER_COLUMN,
  MOVE_TICKET_TO_COLUMN,
  REORDER_TICKET
} from "./board.actions";
import { without, omit, reduce } from "lodash";

const initialStateEntities = {
  board: {
    "1": {
      id: 1,
      title: "portfolio",
      columns: [1, 2, 3, 4, 5]
    }
  },
  column: {
    "1": {
      id: 1,
      title: "Backlog",
      tickets: [6, 1]
    },
    "2": {
      id: 2,
      title: "Analysis",
      tickets: [2]
    },
    "3": {
      id: 3,
      title: "In-development",
      tickets: [3]
    },
    "4": {
      id: 4,
      title: "Client-review",
      tickets: [4]
    },
    "5": {
      id: 5,
      title: "Done",
      tickets: [5]
    },
    ticket: {
      "1": {
        id: 1,
        title: "Køb mælk",
        description: "Vi mangler mælk til havrefrasen imorgen."
      },
      "2": {
        id: 2,
        title: "Vask tøjet",
        description: "Der skal vaskes så vi har rent tøj til imorgen"
      },
      "3": {
        id: 3,
        title: "Hent unger",
        description: "Ungerne skal hentes i institutionen"
      },
      "4": {
        id: 4,
        title: "Lav madpakke",
        description: "Der skal laves madpakker til ungerne"
      },
      "5": {
        id: 5,
        title: "Create",
        description: "Create things"
      },
      "6": {
        id: 6,
        title: "Bum",
        description: "Create things"
      }
    }
  }
};

export const BoardReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
    case ADD_COLUMN: {
      return addColumn(state, action);
    }
    case ADD_TICKET_TO_COLUMN: {
      return addTicketToColumn(state, action);
    }
    case REMOVE_COLUMN: {
      return removeColumn(state, action);
    }
    case REMOVE_TICKET_FROM_COLUMN: {
      return removeTicketFromColumn(state, action);
    }
    case REORDER_COLUMN: {
      return reorderColumn(state, action);
    }
    case REORDER_TICKET: {
      return reorderTicket(state, action);
    }
    case MOVE_TICKET_TO_COLUMN: {
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
      ...state.tickets,
      [id]: {
        id: id,
        title: title,
        description: description
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
    ticket: omit(state.ticket, id)
  };
}

function reorderColumn(state, action) {
  const { boardId, columnIdMoveFrom, columnIdMoveTo } = action.payload;
  const fromIndex = state.board[boardId].columns.indexOf(columnIdMoveFrom);
  const toIndex = state.board[boardId].columns.indexOf(columnIdMoveTo);

  return {
    ...state,
    [boardId]: {
      ...state[boardId],
      columns: immutablySwapItems(state[boardId].columns, fromIndex, toIndex)
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
    case ADD_COLUMN:
      return {
        ...state,
        column: addColumnUI(state.column, action)
      };
    case REMOVE_COLUMN:
      return {
        ...state,
        column: removeColumnUI(state.column, action)
      };
    case SET_TICKETFORMVISIBILITY:
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
