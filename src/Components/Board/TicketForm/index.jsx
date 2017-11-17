import React from "react";
import { Field, reduxForm } from "redux-form";
import style from "./style.css";
import Button from "../../Button";

const TicketForm = props => {
  const { onAdd: handleAdd, onCancel: handleCancel, handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="ticketForm">
      <div className="ticketForm_header">
        <i className="material-icons header_icon">description</i>&nbsp;
        <h3 style={{ display: "inline-block" }}>Add ticket...</h3>
        <br className="clear" />
      </div>
      <Field
        name="title"
        autoComplete="off"
        className="formTextField inputBlock"
        component="input"
        type="text"
        placeholder="Title"
      />
      <Field
        name="description"
        className="formTextArea inputBlock"
        component="textarea"
        type="text"
        placeholder="Description..."
      />
      <div className="ticketForm_submitAndCancelButtons">
        <Button onClick={handleCancel} color="orange_transparent">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleAdd)} color="orange_transparent">
          Add ticket
        </Button>
      </div>
    </div>
  );
};

export default reduxForm({ form: "TicketForm" })(TicketForm);
