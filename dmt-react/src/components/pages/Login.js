import React, { useState } from "react";
import LoginForm from "../Login/LoginForm";
import Logo from "../Login/Logo";
import { useAuth } from "../../Auth/AuthContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const style = {
    image: "ml-10 flex flex-col w-[50%] h-full visible",
    from_container: "flex h-full w-[50%] items-center justify-center relative",
    container: "absolute flex justify-between w-full h-full bg-[#f0f2f5]"
  }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const { setCredentials, currentUser } = useAuth();

  useEffect(() => {
    setCredentials();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await login(user)
    //const message = response.message
    debugger
    setError(response.error)
    setLoading(false)
  }

  const onChange = (e) => {
    setError("");
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUser({
      ...user,
      [target.name]: value,
    });
  };

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className={style.container}>
      <div className={style.image}>
        <Logo />
      </div>
      <div className={style.from_container}>
        <LoginForm
          onSubmit={onSubmit}
          onChange={onChange}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;
