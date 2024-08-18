import { useContext, useState } from "react";
import { createContext } from "react";

interface IAuthContext {
  isLoggin: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [isLoggin, setIsLoggin] = useState(true);

  const handleLogin = () => {
    setIsLoggin(true);
  };

  const handleLogout = () => {
    setIsLoggin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggin, handleLogin, handleLogout }}>
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
