import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../redux/services";

import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authorizationReducer.user);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        avatar: user.image,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const { token } = user;
    dispatch(updateUser({ ...data, token }));
    reset();
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>Edit Profile</h3>
          <label htmlFor="">
            <span className={styles.text}>Username</span>
            <input
              type="text"
              defaultValue={user.username}
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </label>
          <label htmlFor="">
            <span className={styles.text}>Email address</span>
            <input
              type="text"
              // placeholder="Email"
              defaultValue={user.email}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </label>
          <label htmlFor="">
            <span className={styles.text}>New password</span>
            <input
              type="password"
              placeholder="Password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Your password must contain at least 6 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Your password must contain from 6 to 40 character",
                },
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </label>
          <label htmlFor="">
            <span className={styles.text}>Avatar image (url)</span>
            <input
              type="text"
              placeholder="Avatar"
              className={`${styles.input} ${errors.avatar ? styles.inputError : ""}`}
              {...register("avatar", {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(png|jpg|jpeg|gif)$/i,
                  message: "Invalid URL",
                },
              })}
            />
            {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
          </label>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
// Редактирование профиля:

// username не должен быть пустым
// email должен быть корректным почтовым адресом, не должен быть пустым
// new password должен быть от 6 до 40 символом
// avatar image должен быть корректным url
