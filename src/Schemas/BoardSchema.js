import { schema } from "normalizr";

const ticket = new schema.Entity("ticket");

const ticketList = [ticket];

const column = new schema.Entity("column", { tickets: ticketList });

const columnlist = [column];

const boardEntity = new schema.Entity("board", { columns: columnlist });

export { boardEntity };
