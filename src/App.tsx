import AuthContainer from "./components/Auth/authContainer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import React from "react";
import ErrorPage from "./components/Routes/errorPage";

function App() {
  const isLoggedIn = true;
  return (
    <div className="bg-slate-900 h-screen w-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute user={isLoggedIn} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthContainer isLoggedIn={isLoggedIn} />}>
            <Route path="/signin" element={<>SignIn</>} />
            <Route path="/register" element={<>Signup</>} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
