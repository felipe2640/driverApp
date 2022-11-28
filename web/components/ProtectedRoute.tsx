import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  return <>{user ? children : <p>Redirecionando...</p>}</>;
};

export default ProtectedRoute;
