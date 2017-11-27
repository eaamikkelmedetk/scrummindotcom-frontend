import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { BoardReducer, ticketUIReducer } from "../Modules/Board/Reducer";

export const rootReducer = combineReducers({
  entities: BoardReducer,
  boardUI: ticketUIReducer,
  form: formReducer
});
