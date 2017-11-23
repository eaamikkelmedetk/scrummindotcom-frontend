import React from "react";
import ColumnListContainer from "../../Column/ColumnListContainer/ColumnListContainer";
import style from "../board.style.css";
import PropTypes from "prop-types";

class BoardItem extends React.Component {
  render() {
    /*     const { actions, board: { id: boardId } } = this.props; */
    const { board: { id, columns: columnIds } } = this.props;
    return (
      <div className="board">
        <ColumnListContainer {...{ id, columnIds }} />
      </div>
    );
  }
}

BoardItem.propTypes = {
  columns: PropTypes.array
};

export default BoardItem;
