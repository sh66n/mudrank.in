import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";

import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import Login from "./views/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Signup from "./views/Signup";
import CircleDashboard from "./views/CircleDashboard";
import CircleLogin from "./views/CircleLogin";
import Unauthorized from "./views/Unauthorized";
import NotFound from "./views/NotFound";

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
          </Route>
          <Route element={<AuthOutlet fallbackPath="/circle-login" />}>
            <Route path="/dashboard" element={<CircleDashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/circle-login" element={<CircleLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
