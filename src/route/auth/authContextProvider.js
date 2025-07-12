import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    const checkAuth = async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        if (location.pathname !== "signin" && location.pathname !== "signup") {
          navigate("/signin");
        }
        return;
      }

      try {
        const res = await axios.get(config.tokenValidate, {
          headers: {
            Authorization: `Bearer ${token}`, // assuming token is JSON.stringified
          },
        });

        setUser(res); // use res.data to get actual user info
      } catch (error) {
        console.log(error)
        // Token invalid or expired
        localStorage.removeItem("tokens");
        setUser(null);
        navigate("/signin");  // navigate to signin on failure
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
