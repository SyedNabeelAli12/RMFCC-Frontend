import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./compnents/navbar";
import AuthContext, {
  AuthContextProvider,
} from "./route/auth/authContextProvider";
import PiracyRisk from "./route/piracyRisk";
import SignIn from "./route/signIn";
import SignUp from "./route/signUp";

function AppRoutes() {
  const { user, logout } = useContext(AuthContext);

  const handleScrollToPrediction = () => {
    const el = document.getElementById("prediction-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>

      {user ? (
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavBar
                  view="prediction"
                  onNewPredictionClick={handleScrollToPrediction}
                  logout = {logout}
                />
                <PiracyRisk />
                {/* Add other protected routes here */}
              </>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={ <SignIn />}
          />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}
