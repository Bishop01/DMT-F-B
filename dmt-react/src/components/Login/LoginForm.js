import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit, onChange, loading, error }) => {
  const style = {
    input: "p-3 rounded-lg border focus:outline-blue-300",
    label: "pl-1",
    form: "w-full space-y-3 flex flex-col items-center relative",
    field: "flex flex-col space-y-1 w-full",
    form_container:
      "w-[65%] shadow-md rounded-lg bg-white py-10 px-8 flex flex-col items-center space-y-5",
    container: "absolute w-full flex h-full items-center justify-center",
    btn: "w-full p-2 rounded-lg mt-5 text-white font-semibold",
  };

  return (
    <div className={style.container}>
      <div className={style.form_container}>
        <p className="font-semibold text-2xl">Login</p>
        <form className={style.form} onSubmit={(e) => onSubmit(e)}>
          <div className={style.field}>
            <label className={style.label}>Email</label>
            <input
              name="email"
              className={style.input}
              type="email"
              placeholder="john@doe.com"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={style.field}>
            <label className={style.label}>Password</label>
            <input
              name="password"
              className={style.input}
              type="password"
              placeholder="Password"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          {error.length > 0 && (
            <div className="text-red-500 pl-1 w-full text-sm tracking-wide">
              {error}
            </div>
          )}
          <Link
            className="text-blue-500 pl-1 w-full text-sm tracking-wide"
            to="/reset"
          >
            Forgot Password?
          </Link>

          <div className={style.field}>
            <button
              disabled={loading}
              style={{
                backgroundColor: loading
                  ? "rgb(156 163 175)"
                  : "rgb(59 130 246)",
              }}
              className={style.btn}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-sm">
          Don't have an account?
          <Link className="ml-2 text-blue-500" to="/register">
            Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
