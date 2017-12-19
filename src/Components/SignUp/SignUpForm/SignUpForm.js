import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import ButtonItem from "../../Button/ButtonItem";
import { withRouter } from "react-router-dom";
import "./signupform.style.css";
import axios from "axios";
import inputField from "../../inputfield/inputfield";
import { Api } from "../../../Modules/Api";
import {
  required,
  email,
  onlyLettersAndDigits,
  minLength3
} from "../../../Validators/validator";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUpClicked: false
    };
    this.handleShowSignUp = this.handleShowSignUp.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleShowSignUp() {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        isSignUpClicked: true
      };
    });
  }

  handleSignUp(values) {
    const { history } = this.props;
    return axios
      .post(Api.newBoard, {
        Title: values.boardname,
        Email: values.email
      })
      .then(response => {
        history.push("/board/" + response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { isSignUpClicked } = this.state;
    const { handleSubmit, pristine, invalid, submitting } = this.props;
    return (
      <div className="signUp_form">
        {isSignUpClicked ? (
          <div className="signUpform">
            <div className="signUpform_header">CREATE BOARD</div>
            <div className="signUpFormInput_controlGroup">
              <label className="signUpForm_label">Boardname</label>
              <Field
                className="signUpFormInput"
                component={inputField}
                name="boardname"
                type="text"
                tooltip="true"
                autocomplete="false"
                validationErrorClass="field--warning"
                validate={[minLength3, required, onlyLettersAndDigits]}
              />
            </div>
            <div className="signUpFormInput_controlGroup">
              <label className="signUpForm_label">Email</label>
              <Field
                className="signUpFormInput"
                component={inputField}
                name="email"
                type="text"
                tooltip="true"
                validationErrorClass="field--warning"
                validate={[required, email]}
              />
            </div>
            <ButtonItem
              style={{
                width: "26rem",
                height: "4rem",
                fontSize: "18px",
                marginTop: "10px"
              }}
              onClick={handleSubmit(this.handleSignUp)}
              disabled={pristine || invalid || submitting}
              color="black">
              CREATE NOW
            </ButtonItem>
            <br />
            <br />
          </div>
        ) : (
          <ButtonItem
            style={{ width: "28rem", height: "3rem", fontSize: "18px" }}
            onClick={this.handleShowSignUp}
            color="red">
            Create board
          </ButtonItem>
        )}
      </div>
    );
  }
}

export default reduxForm({ form: "SignUpForm" })(withRouter(SignUpForm));
