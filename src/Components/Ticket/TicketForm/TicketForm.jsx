import React from "react";
import { Field, reduxForm } from "redux-form";
import "./ticketform.style.css";
import ButtonItem from "../../Button/ButtonItem";
import PropTypes from "prop-types";

const TicketForm = props => {
  const { handleSubmit, reset, isTicketFormVisible } = props;

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
            className="formTextField inputBlock ticketFormInput"
            component="input"
            type="text"
            placeholder="Title"
          />
          <Field
            name="description"
            className="formTextArea inputBlock ticketFormInput"
            component="textarea"
            type="text"
            placeholder="Description..."
          />
          <div className="ticketForm_submitAndCancelButtons">
            <ButtonItem
              onClick={handleTicketFormVisibility}
              color="orange_transparent">
              Cancel
            </ButtonItem>
            <ButtonItem
              onClick={handleSubmit(handleOnAdd)}
              color="orange_transparent">
              Add ticket
            </ButtonItem>
          </div>
        </div>
      ) : (
        <ButtonItem
          style={{ width: "90%", marginBottom: "0.5rem" }}
          onClick={handleTicketFormVisibility}
          color="blue">
          Add ticket
        </ButtonItem>
      )}
    </div>
  );
};

TicketForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  columnId: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default reduxForm({ form: "TicketForm" })(TicketForm);
