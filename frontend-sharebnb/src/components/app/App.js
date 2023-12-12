import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SharebnbApi from "../../utilities/api";
import userContext from "../../utilities/userContext";

import 'bootswatch/dist/litera/bootstrap.min.css';
import './App.css';

import Nav from "../nav/Nav";
import RoutesList from "../../RoutesList";


/** Main App component for Sharebnb.
 *
 * State:
 * - currentUser: { username, firstName, lastName, email, phone }
 * - token: { token }
 * - isLoaded: boolean to check if data has been fetched.
 * - listings: TODO:
 *
 * App -> { Nav, RoutesList }
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoaded, setIsLoaded] = useState(false);

  /** Calls on api to grab user data and set it to current state.
   *
   * If no user, app still renders.
   */
  useEffect(function getCurrentUser() {
    async function fetchCurrentUser() {
      const { username } = jwtDecode(token);

      try {
        const user = await SharebnbApi.getUser(username);
        setCurrentUser(user);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }
    token ? fetchCurrentUser() : setIsLoaded(true);
  }, [token]);

  /** Sets token to localStorage if valid token has been sent.
   *
   * Otherwise, remove existing token from localStorage.
   */
  useEffect(function setToken() {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");

  }, [token]);

  /** fetches token from backend with username/password.
   *  also sets token to state.
   */
  async function login(user) {
    const token = await SharebnbApi.login(user);

    setToken(token);
  }

  /** registers user to database from server with form data.
   *  sets token in state.
   */
  async function signup(userData) {
    const token = await SharebnbApi.register(userData);

    setToken(token);
  }

  /** sets current user and token to null. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** handles file submission for listings. */
  async function upload(formData) {
    const listing = await SharebnbApi.addListing(formData);
  }

  /** Protects whole app when fetching current user. */
  if (!isLoaded) return <h1>Sharebnb Loading...</h1>;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currentUser }}>
          <Nav logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            logout={logout}
            upload={upload}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
