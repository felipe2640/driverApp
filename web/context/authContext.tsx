import { createContext, useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import type { NextRequest } from "next/server";
import { IUser, signIn } from "../helpers/backend";
import { toast } from "react-toastify";
const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const signup = ({}) => {};
  const login = async (data: any) => {
    signIn(data).then((resp: any) => {
      if (resp === undefined) {
        return;
      }
      setUser(resp);
      router.push("/");
    });
  };
  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
