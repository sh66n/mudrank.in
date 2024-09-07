import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";

import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import Login from "./views/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Users from "./views/Users";

function App() {
  const store = createStore({
    authType: "cookie",
    authName: "jwt",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<Landing />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
