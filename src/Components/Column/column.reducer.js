import {
  ADD_TICKET_TO_COLUMN,
  REMOVE_TICKET_FROM_COLUMN,
  ADD_COLUMN,
  REMOVE_COLUMN,
  MOVE_TICKET_TO_COLUMN,
  REORDER_TICKET
} from "./column.actions";
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
    case MOVE_TICKET_TO_COLUMN: {
      return moveTicketFromTo(state, action);
    }
    case REORDER_TICKET: {
      return reorderTicket(state, action);
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

function moveTicketFromTo(state, action) {
  const { fromColumn, toColumn, ticketId } = action.payload;
  const columnTicketArrIndex = state[fromColumn].tickets.indexOf(ticketId);

  return {
    ...state,
    [fromColumn]: {
      ...state[fromColumn],
      tickets: [
        ...state[fromColumn].tickets.slice(0, columnTicketArrIndex),
        ...state[fromColumn].tickets.slice(columnTicketArrIndex + 1)
      ]
    },
    [toColumn]: {
      ...state[toColumn],
      tickets: [...state[toColumn].tickets, ticketId]
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

function reorderTicket(state, action) {
  const { columnId, ticketIdMoveFrom, ticketIdMoveTo } = action.payload;
  const fromIndex = state[columnId].tickets.indexOf(ticketIdMoveFrom);
  const toIndex = state[columnId].tickets.indexOf(ticketIdMoveTo);

  return {
    ...state,
    [columnId]: {
      ...state[columnId],
      tickets: immutablySwapItems(state[columnId].tickets, fromIndex, toIndex)
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

//Board entity actions end---------------------------------->
