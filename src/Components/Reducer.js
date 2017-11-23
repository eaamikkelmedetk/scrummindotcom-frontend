import { combineReducers } from "redux";
import { BoardReducer } from "./Board/board.reducer";
import { ColumnReducer } from "./Column/column.reducer";
import { TicketReducer } from "./Ticket/ticket.reducer";

export default combineReducers({
  board: BoardReducer,
  column: ColumnReducer,
  ticket: TicketReducer
});
