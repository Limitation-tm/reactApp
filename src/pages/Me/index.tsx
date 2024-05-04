import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  fetchUserMyData,
  logout,
  selectIsAuth,
} from "../../redux/slices/authSlice";
import axios from "../../axios.js";
import user from "../../assets/img/user.png";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./Me.module.scss";

export const Me: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
  };
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const [avatarUrl, setAvatarUrl] = React.useState("");

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post<{ url: string }>(
          "/uploaduserimage",
          formData
        );
        setAvatarUrl(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const fields = { avatarUrl };
    try {
      await axios.patch(`/changeuser/`, fields);
      console.log("Аватар изменен");
      alert("Вы изменили аватар");

      navigate("/");
    } catch (error) {
      console.warn(error);
    }
  };

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={styles.root}>
      <h1>{data?.fullName}</h1>
      <div onClick={() => inputFileRef.current?.click()}>
        {avatarUrl ? (
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_APP_LIMI}${avatarUrl}`}
            alt="Pizza"
          />
        ) : data?.avatarUrl ? (
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_APP_LIMI}${data.avatarUrl}`}
            alt="Pizza"
          />
        ) : (
          <>{user}</>
        )}
      </div>

      <div className={styles.inputbox}>
        <form>
          <input
            ref={inputFileRef}
            type="file"
            placeholder="avatarUrl"
            onChange={handleChangeFile}
            hidden
          />

          <h2></h2>
          <div>{data?.email}</div>
          <div onClick={onSubmit} className={styles.remember}>
            Изменить аватар
          </div>
          <button className="button" onClick={onClickLogout}>
            Выйти
          </button>
        </form>
      </div>
    </div>
  );
};
