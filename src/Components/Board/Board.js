import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as ActionCreators from "../../Modules/Board/ActionCreators";
import ColumnListContainer from "../Column/ColumnListContainer/ColumnListContainer";
import "./board.style.css";
import PropTypes from "prop-types";
import { flow } from "lodash";
import Spinner from "react-spinkit";

class Board extends Component {
  static propTypes = {
    board: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      ).isRequired
    })
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { actions: { dispatchGetBoard } } = this.props;
    dispatchGetBoard(this.props.match.params.boardId);
  }

  render() {
    const {
      id: boardId,
      title,
      columns: columnIds,
      isFetching,
      error
    } = this.props;
    return (
      <div className="boardWrapper">
        {!isFetching &&
          error === undefined && (
            <div className="board_title">
              <h1 className="title_heading">{title}</h1>
            </div>
          )}
        <div className="board">
          {!isFetching && error === undefined ? (
            <ColumnListContainer {...{ boardId, columnIds }} />
          ) : error ? (
            <div className="centerElements errorMessage">
              <i class="material-icons errorMessage_icon">error_outline</i>
              <br />
              {error}
            </div>
          ) : (
            <div className="centerElements">
              <Spinner name="line-scale" color="coral" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entities: { board } } = state;
  const { match: { params } } = ownProps;
  const { id, title, columns } = board[params.boardId] || {
    id: 0,
    title: "",
    columns: []
  };

  const { isFetching, error } = board.meta || {
    isFetching: true,
    error: undefined
  };

  return {
    id,
    title,
    columns,
    isFetching,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...ActionCreators }, dispatch) };
};

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Board);
