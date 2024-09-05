import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { Spin } from "antd";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleAuthStateChange = (user) => {
      setIsLoading(true);
      if (user) {
        console.log(user);
        const { uid, displayName, email, photoURL } = user;
        setUser({ uid, displayName, email, photoURL });
        navigate("/");
      } else {
        setUser({});
        navigate("/login");
      }
      setTimeout(() => setIsLoading(false), 1000);
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin size="large" fullscreen /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;