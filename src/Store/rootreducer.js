import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { BoardReducer, boardUiReducer } from "../Modules/Board/Reducer";

export const rootReducer = combineReducers({
  entities: BoardReducer,
  boardUI: boardUiReducer,
  form: formReducer
});
