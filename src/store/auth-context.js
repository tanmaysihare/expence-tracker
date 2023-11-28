import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  profileComplete: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null); // Store the logout timer ID
  const [profileComplete, setProfileComplete] = useState(false);
  const userIsLoggedIn = !!token;

  // Reset the logout timer whenever there's user activity
  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    const newLogoutTimer = setTimeout(() => {
      logoutHandler();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
    setLogoutTimer(newLogoutTimer);
  };

  useEffect(() => {
    // Set the initial logout timer when the component mounts
    resetLogoutTimer();

    // Cleanup the timer when the component unmounts
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [token]); // Run this effect whenever the token changes

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    resetLogoutTimer(); // Reset the timer after login
  
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setProfileComplete(false);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
const setProfileCompleteState = (value) => {
  setProfileComplete(value);
}


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    profileComplete: profileComplete,
    login: loginHandler,
    logout: logoutHandler,
    setProfileCompleteState: setProfileCompleteState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;