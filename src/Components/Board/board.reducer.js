import { ADD_COLUMN, REMOVE_COLUMN } from "./board.actions";
import { without } from "lodash";

const initialStateEntities = {
  "1": {
    id: 1,
    title: "portfolio",
    columns: [1, 2, 3, 4, 5]
  }
};

export const BoardReducer = (state = initialStateEntities, action) => {
  switch (action.type) {
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

function addColumn(state, action) {
  const { id, boardId, title } = action.payload;
  return {
    ...state,
    [boardId]: {
      ...state[boardId],
      columns: [...state[boardId].columns, id]
    }
  };
}

function removeColumn(state, action) {
  const { boardId, columnId } = action.payload;
  return {
    ...state,
    [boardId]: {
      ...state[boardId],
      columns: without(state[boardId].columns, columnId)
    }
  };
}
