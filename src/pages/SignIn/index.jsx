import React from "react";
import styles from "./SignIn.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify);
    reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>Sign In</h3>
          <label htmlFor="">
            <span className={styles.text}>Email address</span>
            <input
              type="text"
              placeholder="Email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </label>
          <label htmlFor="">
            <span className={styles.text}>Password</span>
            <input
              type="password"
              placeholder="Password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              {...register("password", {
                required: "Password is empty",
                // message: "Invalid password",
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </label>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <span className={styles.question}>
            Don’t have an account?{" "}
            <a className={styles.link}>
              <Link to="./sign-up">Sign Up.</Link>
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
