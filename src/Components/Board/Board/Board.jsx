import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BoardItem from "../BoardItem/BoardItem";
import * as ActionCreators from "../../../Modules/Board/ActionCreators";

const mapStateToProps = (state, ownProps) => {
  const { entities: { board } } = state;
  return {
    board: board[1]
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...ActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);
