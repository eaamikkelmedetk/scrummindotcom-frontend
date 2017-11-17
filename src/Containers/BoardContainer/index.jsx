import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Board from "../../Components/Board";
import { denormalize } from "normalizr";
import { boardSchema } from "./../../Schemas/Board";
import * as BoardActionCreators from "./actionCreator";

const mapStateToProps = (state, ownProps) => {
  const { board: { entities }, boardUI } = state;
  return {
    board: denormalize(1, boardSchema, entities),
    boardUI
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...BoardActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
