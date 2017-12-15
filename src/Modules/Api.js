const url = "http://sbackend.nullpoint.dk/api";
const version = "v1";

export const Api = {
  newBoard: `${url}/${version}/board`,
  getBoard: function(boardId) {
    return `${url}/${version}/board/${boardId}`;
  },
  addTicket: `${url}/${version}/ticket`,
  removeTicket: function(ticketId) {
    return `${url}/${version}/ticket/${ticketId}`;
  },
  moveTicketFromColumn: function(ticketId, toColumn) {
    return `${url}/${version}/ticket/moveticket/${ticketId}/${toColumn}`;
  },
  addColumn: `${url}/${version}/column`,
  updateColumn: `${url}/${version}/column`,
  removeColumn: function(columnId) {
    return `${url}/${version}/column/${columnId}`;
  },
  reorderColumn: function(columnIdFrom, columnIdTo) {
    return `${url}/${version}/column/reorder/${columnIdFrom}/${columnIdTo}`;
  },
  reorderTicket: function(ticketIdFrom, ticketIdTo) {
    return `${url}/${version}/ticket/reorder/${ticketIdFrom}/${ticketIdTo}`;
  }
};
