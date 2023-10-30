import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import LoginForm from "./pages/auth/login/LoginForm";
import SignupForm from "./pages/auth/signup/SignupForm";
import ListingList from "./pages/listing/ListingList";
import ListingDetail from "./pages/listing/ListingDetail";
import ListingForm from "./pages/listing/ListingForm";
import userContext from "./utilities/userContext";
import { Navigate } from "react-router-dom";

/** RoutesList for Sharebnb.
 *
 * Props:
 * - login: function to login user (from parent)
 * - signup: function to register user (from parent)
 *
 * App -> RoutesList
 *     -> { Homepage, LoginForm, SignupForm, ListingList, ListDetail }
 */

function RoutesList({ login, signup, upload }) {

  const { currentUser } = useContext(userContext);
  return (
    <div className="RoutesList">
      <Routes>
        <Route path="/" element={<Homepage login={login} signup={signup} />} />
        <Route path="/listings" element={<ListingList />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="*" element={<Navigate />} />

        {currentUser
          ? <>
            <Route path="/upload" element={<ListingForm upload={upload} />} />
          </>
          : <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        }
      </Routes>
    </div>
  );
}

export default RoutesList;