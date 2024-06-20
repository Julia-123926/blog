import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/services";

import styles from "./SignIn.module.scss";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorizationReducer);
  const history = useHistory();

  useEffect(() => {
    if (authorization.signUpErr) {
      setError("email", { message: "Password or email is invalid" });
      setError("password", { message: "Password or email is invalid" });
    }
    if (authorization.user.token) {
      history.push("/");
    }
  }, [authorization, history, setError]);
  const onSubmit = (data) => {
    dispatch(loginUser({ data }));
    reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>Sign In</h3>
          <label htmlFor="email">
            <span className={styles.text}>Email address</span>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </label>
          <label htmlFor="password">
            <span className={styles.text}>Password</span>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password", {
                required: "Password is empty",
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </label>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <span className={styles.question}>
            Don’t have an account?{" "}
            <Link to="./sign-up" className={styles.link}>
              Sign Up.
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
