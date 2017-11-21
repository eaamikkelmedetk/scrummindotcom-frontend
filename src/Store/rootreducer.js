import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { BoardReducer, boardUIReducer } from "../Components/Board/BoardReducer";

export const rootReducer = combineReducers({
  entities: BoardReducer,
  boardUI: boardUIReducer,
  form: formReducer
});
