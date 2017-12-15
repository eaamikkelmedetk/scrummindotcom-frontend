import React, { Component } from "react";
import "./signup.style.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import { connect } from "react-redux";

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <div className="signUp_header">
          <h1 className="signUp_title">Scrummin.com</h1>
        </div>
        <SignUpForm />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

SignUp.propTypes = {};

export default connect(mapStateToProps)(SignUp);
