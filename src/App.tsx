import AuthContainer from "./components/Auth/authContainer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import React, { useEffect } from "react";
import ErrorPage from "./components/Routes/errorPage";
import SignIn from "./components/Auth/signIn";
import RegisterForm from "./components/Auth/register";
import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";

function App() {
  const user = useAuthStore((store) => store.user);
  const darkMode = useThemeStore((store) => store.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className="bg-secondaryLight dark:bg-primaryDark h-screen w-screen flex 
    justify-center items-center"
    >
      <Router>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthContainer user={user} />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
