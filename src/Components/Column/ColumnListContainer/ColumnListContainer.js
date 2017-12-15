import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../../Modules/Board/ActionCreators";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ColumnItem from "../ColumnItem/ColumnItem";
import ColumnForm from "../ColumnForm/ColumnForm";
import "./columnlistcontainer.style.css";

class ColumnListContainer extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    columnIds: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    columnEntity: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          title: PropTypes.string
        }),
        PropTypes.shape({
          isFetching: PropTypes.bool
        })
      ])
    )
  };

  getColumns(actions, boardId, columnIds, columnEntity) {
    let columnsToRender = columnIds;

    let printColumns = columnsToRender.map((id, localIndex) => {
      let column = columnEntity[id];
      return (
        <ColumnItem
          key={column.id}
          form={column.id.toString()}
          initialValues={{
            columnTitleField: column.title
          }}
          {...{ actions, localIndex, column, boardId }}
        />
      );
    });

    return printColumns;
  }

  render() {
    const {
      actions: { dispatchAddColumn },
      actions,
      boardId,
      columnIds,
      columnEntity
    } = this.props;
    return (
      <div className="columns">
        {this.getColumns(actions, boardId, columnIds, columnEntity)}
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
