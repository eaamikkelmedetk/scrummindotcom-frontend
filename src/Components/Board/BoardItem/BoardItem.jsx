import React from "react";
import ColumnListContainer from "../../Column/ColumnListContainer/ColumnListContainer";
import style from "../board.style.css";
import PropTypes from "prop-types";

class BoardItem extends React.Component {
  static propTypes = {
    board: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      ).isRequired
    })
  };

  render() {
    /*     const { actions, board: { id: boardId } } = this.props; */
    const { board: { id: boardId, columns: columnIds } } = this.props;
    return (
      <div className="board">
        <ColumnListContainer {...{ boardId, columnIds }} />
      </div>
    );
  }
}

export default BoardItem;
