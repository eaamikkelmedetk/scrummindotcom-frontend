import {
  ADD_TICKET_TO_COLUMN,
  REMOVE_TICKET_FROM_COLUMN,
  ADD_COLUMN,
  REMOVE_COLUMN,
  SET_TICKETFORMVISIBILITY
} from "./ticket.actions";
import { omit, reduce } from "lodash";

const initialStateEntities = {
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
};

export const TicketReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
    case ADD_TICKET_TO_COLUMN: {
      return addTicketToColumn(state, action);
    }
    case REMOVE_TICKET_FROM_COLUMN: {
      return removeTicketFromColumn(state, action);
    }
    default: {
      return state;
    }
  }
};

function addTicketToColumn(state, action) {
  const { id, title, description } = action.payload;
  return {
    ...state,
    [id]: {
      id: id,
      title: title,
      description: description
    }
  };
}

function removeTicketFromColumn(state, action) {
  const { id } = action.payload;
  return {
    ...state,
    state: omit(state, id)
  };
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
