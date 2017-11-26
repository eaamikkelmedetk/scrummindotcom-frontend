import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ColumnActionCreators from "../column.actioncreators";
import React from "react";
import ColumnItem from "../ColumnItem/ColumnItem";
import ColumnForm from "../ColumnForm/ColumnForm";

class ColumnListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

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
  return { actions: bindActionCreators({ ...ColumnActionCreators }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ColumnListContainer
);
