import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../../Modules/Board/ActionCreators";
import React from "react";
import PropTypes from "prop-types";
import ColumnItem from "../ColumnItem/ColumnItem";
import ColumnForm from "../ColumnForm/ColumnForm";

class ColumnListContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    columnIds: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    columnEntity: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string
      })
    )
  };

  getColumns() {
    const { actions, boardId, columnIds, columnEntity } = this.props;
    let columnsToRender = columnIds;

    let printColumns = columnsToRender.map((id, localIndex) => {
      let column = columnEntity[id];
      return (
        <ColumnItem
          key={column.id}
          {...{ actions, localIndex, column, boardId }}
        />
      );
    });

    return printColumns;
  }

  render() {
    const { actions: { dispatchAddColumn }, boardId } = this.props;
    return (
      <div className="columns">
        {this.getColumns()}
        <ColumnForm {...{ dispatchAddColumn, boardId }} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { column: columnEntity } = state.entities;
  return { columnEntity };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ ...ActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ColumnListContainer
);
