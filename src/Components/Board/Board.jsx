import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSelector } from "reselect";
import BoardItem from "./BoardItem";
import { denormalize } from "normalizr";
import { boardSchema } from "./../../Schemas/Board";
import * as BoardActionCreators from "./BoardActionCreators";
import _ from "lodash";

const mapStateToProps = (state, ownProps) => {
  const { entities, boardUI } = state;
  return {
    board: denormalize(1, boardSchema, entities),
    boardUI
  };
};

/* const getBoard = state => {
  const { entities: { board } } = state;
  return board[1];
}; */
/* const getColumns = state => state.entities.column;
const getTickets = state => state.entities.ticket; */

/* const makeBoardState = () =>
  createSelector(getBoard, getColumns, getTickets, (board, columns, tickets) => {
    return {
      board: {
        ...board,
        columns: _.chain(columns, tickets)
          .pick(columns, board.columns)
          .map(column => {
            return { ...column, tickets: _.pick(tickets, column.tickets) };
          })
          .value()
      }
    };
  }); */

/* const makeBoardState = () =>
  createSelector(getBoard, board => {
    console.log(board);
  }); */

/* const mapStateToProps = (state, ownProps) => {
  const { board } = makeBoardState()(state);
  const { boardUI } = state;
  return { board, boardUI };
}; */

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...BoardActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);
