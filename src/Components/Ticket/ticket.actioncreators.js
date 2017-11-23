import { ADD_TICKET_TO_COLUMN, REMOVE_TICKET_FROM_COLUMN, SET_TICKETFORMVISIBILITY } from "./ticket.actions";
import uniqid from "uniqid";

export function dispatchAddTicketToColumn(columnid, title, description) {
  return {
    type: ADD_TICKET_TO_COLUMN,
    payload: {
      id: uniqid(),
      columnid,
      title,
      description
    }
  };
}

export function dispatchRemoveTicketFromColumn(columnid, id) {
  return {
    type: REMOVE_TICKET_FROM_COLUMN,
    payload: {
      columnid,
      id
    }
  };
}

export function dispatchSetTicketFormVisibility(columnId) {
  return {
    type: SET_TICKETFORMVISIBILITY,
    payload: {
      columnId
    }
  };
}
