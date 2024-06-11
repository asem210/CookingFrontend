import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import { RegisterPage } from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route
          path="*"
          element={
            <Navigate
              to={userLoggedIn ? "/brisasMarinas/Usuario" : "/brisasMarinas"}
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
