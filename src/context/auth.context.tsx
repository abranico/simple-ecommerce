import { useContext, useReducer, useState } from "react";
import { createContext } from "react";

const initialState = false;
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN": {
      return true;
    }
    case "LOGOUT": {
      return initialState;
    }
  }
  return state;
};

interface IAuthContext {
  isLoggin: boolean;
  isAdmin: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = () => dispatch({ type: "LOGIN" });

  const handleLogout = () => dispatch({ type: "LOGOUT" });

  const isAdmin = true;

  return (
    <AuthContext.Provider
      value={{ isLoggin: state, isAdmin, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthContextProvider;
