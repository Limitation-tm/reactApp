import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth, fetchUserData } from "../../redux/slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

interface FormData {
  email: string;
  password: string;
}

const newLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "qwerty123",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      alert("Fail Auth");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={styles.inputbox}>
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            {...register("email", { required: "Input email" })}
            required
          />
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className={styles.inputbox}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            {...register("password", { required: "Input password" })}
            required
          />
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div className={styles.remember}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button className={styles.button} disabled={!isValid} type="submit">
          Login
        </button>
        <div className={styles.registerlink}>
          <Link to="/register">
            <p>
              Don't have an account? <a>Register</a>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default newLogin;
