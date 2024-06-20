import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authorizeUser } from "../../redux/services";

import styles from "./SignUp.module.scss";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { signInErr } = useSelector((state) => state.authorizationReducer);
  const userToken = useSelector((state) => state.authorizationReducer.user.token);

  useEffect(() => {
    if (userToken) {
      history.push("/");
    }
  }, [history, userToken]);
  const onSubmit = (data) => {
    dispatch(authorizeUser({ data }));
  };

  const password = watch("password");

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>Create new account</h3>
          <label htmlFor="username">
            <span className={styles.text}>Username</span>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className={`${styles.input} ${errors.username || signInErr?.username ? styles.inputError : ""}`}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Your username must contain at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must contain from 3 to 20 characters",
                },
              })}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            {signInErr?.username && <p className={styles.error}>This username is already taken</p>}
          </label>
          <label htmlFor="email">
            <span className={styles.text}>Email address</span>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={`${styles.input} ${errors.email || signInErr?.email ? styles.inputError : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            {signInErr?.email && <p className={styles.error}>This email is already taken</p>}
          </label>
          <label htmlFor="password">
            <span className={styles.text}>Password</span>
            <input
              id="password"
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
          <label htmlFor="repeatPassword">
            <span className={styles.text}>Repeat Password</span>
            <input
              id="repeatPassword"
              type="password"
              placeholder="Password"
              className={`${styles.input} ${errors.repeatPassword ? styles.inputError : ""}`}
              {...register("repeatPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords must match",
              })}
            />
            {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
          </label>
          <label htmlFor="checkbox">
            <input
              id="checkbox"
              type="checkbox"
              className={styles.checkbox}
              {...register("agreement", {
                required: "You must agree to the processing of personal information",
              })}
            />{" "}
            <span className={`${styles.checkbox} ${styles.agreement}`}>
              I agree to the processing of my personal information
            </span>
            {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
          </label>
          <button type="submit" className={styles.button}>
            Create
          </button>
          <span className={styles.question}>
            Already have an account?{" "}
            <Link className={styles.link} to="/sign-in">
              {" "}
              Sign In.
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
