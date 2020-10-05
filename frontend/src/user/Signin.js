import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">E-mail</label>
              <input className="form-control" type="email" />
              <div className="form-group">
                <label className="text-light">Password</label>
                <input className="form-control" type="password" />
              </div>
              <button className="btn btn-success btn-block">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for User to Sign In!">
      {SignInForm()}
    </Base>
  );
};
export default Signin;
