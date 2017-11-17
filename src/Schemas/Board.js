import { schema } from 'normalizr';

const ticketSchema = new schema.Entity("ticket")
const columnSchema = new schema.Entity("column", {tickets: [ticketSchema]})
export const boardSchema = new schema.Entity('board', {columns: [columnSchema]});

