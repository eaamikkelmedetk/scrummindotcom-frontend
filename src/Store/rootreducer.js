import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import reducer from "../Components/Reducer";
import { ticketUIReducer } from "../Components/Ticket/ticket.reducer";

export const rootReducer = combineReducers({
  entities: reducer,
  boardUI: ticketUIReducer,
  form: formReducer
});
