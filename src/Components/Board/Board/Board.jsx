import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BoardItem from "../BoardItem/BoardItem";
import * as BoardActionCreators from "../board.actioncreator";

const mapStateToProps = (state, ownProps) => {
  const { entities: { board } } = state;
  return {
    board: board[1]
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...BoardActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);
