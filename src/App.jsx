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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/j" element={<div>holan't</div>} />
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
