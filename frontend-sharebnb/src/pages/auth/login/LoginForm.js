import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import { Card, CardBody } from "reactstrap";

import "./LoginForm.css";

/**
 * LoginForm: Renders for for user to log in
 *
 * Displays errors if user info is incorrect
 *
 * Props:
 * - login: function that sends user login info to update state in main app
 *
 * State:
 * - loginData: object that holds/updates user username and login info
 * {username: "", password: ""}
 *
 * - formErrors: If errors returned from login attempt, holds array of error
 *   messages
 * ["error", ...]
 *
 * RoutesList => LoginForm => Alert
 *
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  /** handleChange: updates login information in state as user types in input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(l => ({ ...l, [name]: value }));
  }

  /** Handles login form submit
   * Calls login function and sends data to App
   * OR
   * if errors, displays errors
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormErrors([]);

    try {
      await login(loginData);
      navigate("/");
    } catch (err) {
      setFormErrors(err.message);
    }
  }

  return (

    <div className="LoginForm">
      <Card className="LoginForm-card shadow p-3 mb-5 bg-white rounded">
        <CardBody>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="LoginForm-username">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                name="username"
                value={loginData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="LoginForm-password">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="form-control"
                required
                type="password"
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </CardBody>
      </Card >
      <div className="LoginForm-errors">
        {formErrors.length !== 0 && <Alert messages={formErrors} type={"danger"} />}
      </div>
    </div>

  );

}

export default LoginForm;