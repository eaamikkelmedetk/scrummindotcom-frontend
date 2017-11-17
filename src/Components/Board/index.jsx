import React from "react";
import Column from "./Column";
import AddColumn from "./AddColumn";
import style from "./style.css";
import PropTypes from "prop-types";

class Board extends React.Component {
  getColumns() {
    const {
      board: { columns: boardColumns, id: boardId },
      boardUI: { column: UIVisibilityColumns },
      actions
    } = this.props;
    return boardColumns.map(column => (
      <Column
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

Board.propTypes = {
  columns: PropTypes.array
};

export default Board;
