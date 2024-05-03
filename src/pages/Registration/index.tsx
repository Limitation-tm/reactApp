import React from "react";
import styles from "../Login/Login.module.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserRegister, selectIsAuth } from "../../redux/slices/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Vasya Pupkin",
      email: "vasya555@test.com",
      password: "qwerty123",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const data = await dispatch(fetchUserRegister(values));
    if (!data.payload) {
      alert("User is already being");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      console.log("DATAREG", data);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <div className={styles.inputbox}>
          <input
            type="text"
            placeholder="Input name"
            className={styles.input}
            {...register("fullName", { required: "Input fullName" })}
          />
        </div>
        <div className={styles.inputbox}>
          <input
            type="email"
            placeholder="Input Email"
            {...register("email", { required: "Input email" })}
            className={styles.input}
          />
        </div>
        <div className={styles.inputbox}>
          <input
            type="password"
            placeholder="Input password"
            {...register("password", { required: "Input password" })}
            className={styles.input}
          />
        </div>
        <button className={styles.button} disabled={!isValid} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
