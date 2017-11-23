import React from "react";
import { Field, reduxForm } from "redux-form";
import style from "../ticket.style.css";
import ButtonItem from "../../Button/ButtonItem";

const TicketForm = props => {
  const {
    onAdd: handleAdd,
    onCancel: handleCancel,
    handleSubmit,
    pristine,
    reset,
    submitting,
    isTicketFormVisible
  } = props;

  const handleTicketFormVisibility = () => {
    const { columnId, actions: { dispatchSetTicketFormVisibility } } = props;
    dispatchSetTicketFormVisibility(columnId);
    reset();
  };

  const handleOnAdd = values => {
    const { actions: { dispatchAddTicketToColumn }, columnId } = props;
    const { title, description } = values;

    dispatchAddTicketToColumn(columnId, title, description);

    handleTicketFormVisibility(columnId);
    reset();
  };

  return (
    <div
      style={{
        backgroundColor: isTicketFormVisible ? "#FAFAFA" : "transparent",
        borderTop: isTicketFormVisible ? "1px solid black" : "0"
      }}
      className="column_ticketForm">
      {isTicketFormVisible ? (
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
            <ButtonItem onClick={handleTicketFormVisibility} color="orange_transparent">
              Cancel
            </ButtonItem>
            <ButtonItem onClick={handleSubmit(handleOnAdd)} color="orange_transparent">
              Add ticket
            </ButtonItem>
          </div>
        </div>
      ) : (
        <ButtonItem style={{ width: "90%", marginBottom: "0.5rem" }} onClick={handleTicketFormVisibility} color="blue">
          Add ticket
        </ButtonItem>
      )}
    </div>
  );
};

export default reduxForm({ form: "TicketForm" })(TicketForm);
