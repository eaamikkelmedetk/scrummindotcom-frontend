import { schema, arrayOf, normalize } from 'normalizr';
import BoardSchema from './Board';

const ColumnSchema = new schema.Entity('columns', {board: BoardSchema});


export default ColumnSchema;