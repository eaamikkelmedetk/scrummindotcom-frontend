import { ADD_TICKET_TO_COLUMN, REMOVE_TICKET_FROM_COLUMN, ADD_COLUMN, REMOVE_COLUMN } from "./column.actions";
import { omit } from "lodash";

const initialStateEntities = {
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
  }
};

export const ColumnReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
    case ADD_TICKET_TO_COLUMN: {
      return addTicketToColumn(state, action);
    }
    case REMOVE_TICKET_FROM_COLUMN: {
      return removeTicketFromColumn(state, action);
    }
    case ADD_COLUMN: {
      return addColumn(state, action);
    }
    case REMOVE_COLUMN: {
      return removeColumn(state, action);
    }
    default: {
      return state;
    }
  }
};

//Board entity actions---------------------------------->

function addTicketToColumn(state, action) {
  const { columnid, id } = action.payload;
  return {
    ...state,
    [columnid]: {
      ...state[columnid],
      tickets: [...state[columnid].tickets, id]
    }
  };
}

function removeTicketFromColumn(state, action) {
  const { columnid, id } = action.payload;
  const columnTicketArrIndex = state[columnid].tickets.indexOf(id);
  return {
    ...state,
    [columnid]: {
      ...state[columnid],
      tickets: [
        ...state[columnid].tickets.slice(0, columnTicketArrIndex),
        ...state[columnid].tickets.slice(columnTicketArrIndex + 1)
      ]
    }
  };
}

function addColumn(state, action) {
  const { id, title } = action.payload;
  return {
    ...state,
    [id]: {
      id: id,
      title: title,
      tickets: []
    }
  };
}

function removeColumn(state, action) {
  const { columnId } = action.payload;
  /*   ticket: omit(state.ticket, state.column[columnId].tickets), */
  return omit(state, columnId);
}

//Board entity actions end---------------------------------->
