import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState();

  useEffect(() => {
    setFormType(type);
  }, [type]);

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "signUp" ? "signIn" : "signUp"));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "signIn" ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Don&apos;t have account?{" "}
                <Link
                  to="/login/signUp"
                  className="text-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Sign Up
                </Link>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{" "}
                <Link
                  to="/login/signIn"
                  className="text-primary"
                  role="button"
                  onClick={toggleFormType}
                >
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
