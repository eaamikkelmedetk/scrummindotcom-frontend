import {
  ADD_TICKET_TO_COLUMN,
  REMOVE_TICKET_FROM_COLUMN,
  ADD_COLUMN,
  REMOVE_COLUMN,
  SET_TICKETFORMVISIBILITY
} from "./actions";
import { omit, without, reduce } from "lodash";

const initialStateEntities = {
  entities: {
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
      }
    },
    column: {
      "1": {
        id: 1,
        title: "Backlog",
        tickets: [1]
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
      }
    },
    board: {
      "1": {
        id: 1,
        title: "portfolio",
        columns: [1, 2, 3, 4, 5]
      }
    }
  },
  result: 1
};

export const boardReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
    case ADD_TICKET_TO_COLUMN: {
      return {
        ...state,
        entities: addTicketToColumn(state.entities, action)
      };
    }
    case REMOVE_TICKET_FROM_COLUMN: {
      return {
        ...state,
        entities: removeTicketFromColumn(state.entities, action)
      };
    }
    case ADD_COLUMN: {
      return {
        ...state,
        entities: addColumn(state.entities, action)
      };
    }
    case REMOVE_COLUMN: {
      return {
        ...state,
        entities: removeColumn(state.entities, action)
      };
    }
    default: {
      return state;
    }
  }
};

//Board entity actions---------------------------------->
function addTicketToColumn(state, action) {
  const { columnid, id, title, description } = action.payload;
  return {
    ...state,
    ticket: {
      ...state.ticket,
      [id]: {
        id: id,
        title: title,
        description: description
      }
    },
    column: {
      ...state.column,
      [columnid]: {
        ...state.column[columnid],
        tickets: [...state.column[columnid].tickets, id]
      }
    }
  };
}

function removeTicketFromColumn(state, action) {
  const { columnid, id } = action.payload;
  const columnTicketArrIndex = state.column[columnid].tickets.indexOf(id);
  return {
    ...state,
    ticket: omit(state.ticket, id),
    column: {
      ...state.column,
      [columnid]: {
        ...state.column[columnid],
        tickets: [
          ...state.column[columnid].tickets.slice(0, columnTicketArrIndex),
          ...state.column[columnid].tickets.slice(columnTicketArrIndex + 1)
        ]
      }
    }
  };
}

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

function removeColumn(state, action) {
  const { boardId, columnId } = action.payload;
  return {
    ...state,
    ticket: omit(state.ticket, state.column[columnId].tickets),
    column: omit(state.column, columnId),
    board: {
      ...state.board,
      [boardId]: {
        ...state.board[boardId],
        columns: without(state.board[boardId].columns, columnId)
      }
    }
  };
}

//Board entity actions end---------------------------------->
const InitialUIState = {
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

export const boardUIReducer = (state = InitialUIState, action) => {
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
  /* return {
     column: {
       ...state.column,
       [columnId]: {
         ...state.column[columnId],
         isTicketFormVisibile: !state.column[columnId].isTicketFormVisibile
       }
     }
  };  */

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
