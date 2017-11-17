import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { boardReducer, boardUIReducer } from "../Containers/BoardContainer/reducer";

export const rootReducer = combineReducers({
  board: boardReducer,
  boardUI: boardUIReducer,
  form: formReducer
});
