import React, { Component } from "react";
import style from "../column.style.css";
import { Field, reduxForm } from "redux-form";
import ButtonItem from "../../Button/ButtonItem";

class ColumnForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }

  handleAddColumn(values) {
    const { dispatchAddColumn, boardId, reset } = this.props;
    const { title } = values;
    dispatchAddColumn(boardId, title);
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={"addNewColumn"}>
        <div className="addNewColumn_headerContainer">
          <h2 className="addNewColumn_title">Add column...</h2>
        </div>
        <div className="addNewColumn_columnForm">
          <div className="columnForm">
            <Field
              name="title"
              autoComplete="off"
              className="formTextField inputBlock"
              component="input"
              type="text"
              placeholder="Column name..."
            />
            <div className="addNewColumn_submitButton">
              <ButtonItem onClick={handleSubmit(this.handleAddColumn)} color="orange_transparent">
                Add column
              </ButtonItem>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: "ColumnForm" })(ColumnForm);
