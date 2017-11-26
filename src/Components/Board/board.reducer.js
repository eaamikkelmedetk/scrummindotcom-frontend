import { ADD_COLUMN, REMOVE_COLUMN, REORDER_COLUMN } from "./board.actions";
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
    case REORDER_COLUMN: {
      return reorderColumn(state, action);
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

function reorderColumn(state, action) {
  console.log("reducer");
  const { boardId, columnIdMoveFrom, columnIdMoveTo } = action.payload;
  const fromIndex = state[boardId].columns.indexOf(columnIdMoveFrom);
  const toIndex = state[boardId].columns.indexOf(columnIdMoveTo);

  return {
    ...state,
    [boardId]: {
      ...state[boardId],
      columns: immutablySwapItems(state[boardId].columns, fromIndex, toIndex)
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
