import React from "react";
import ColumnItem from "../Column/ColumnItem";
import AddColumn from "../AddColumn";
import style from "./BoardStyle.css";
import PropTypes from "prop-types";

class BoardItem extends React.Component {
  getColumns() {
    const {
      board: { columns: boardColumns, id: boardId },
      boardUI: { column: UIVisibilityColumns },
      actions
    } = this.props;
    return boardColumns.map(column => (
      <ColumnItem
        key={column.id}
        isTicketFormVisible={UIVisibilityColumns[column.id].isTicketFormVisibile}
        onTicketFormVisibilityChange={actions.dispatchSetTicketFormVisibility}
        {...actions}
        column={column}
        boardId={boardId}
      />
    ));
  }

  render() {
    const { actions, board: { id: boardId } } = this.props;
    return (
      <div className="board">
        {this.getColumns()}
        <AddColumn boardId={boardId} {...actions} />
      </div>
    );
  }
}

BoardItem.propTypes = {
  columns: PropTypes.array
};

export default BoardItem;
