import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return <h1>Loading</h1>;
};

export default LogOut;
