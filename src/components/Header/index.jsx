import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/authorizationSlice";

const Header = () => {
  const { user } = useSelector((state) => state.authorizationReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">
          <div className={styles.title}>Realworld Blog</div>
        </Link>
        {user.token ? (
          <div className={styles.success}>
            <button className={`${styles.button} ${styles.create}`}>
              <Link to="/new-article">Create article</Link>
            </button>
            <button className={`${styles.button} ${styles.name}`}>
              <Link to="/profile">{user.username}</Link>
            </button>
            <button
              onClick={handleLogout}
              className={`${styles.button} ${styles.logOut}`}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className={styles.authorization}>
            <button className={`${styles.button} ${styles.signIn}`}>
              <Link to="/sign-in">Sign In</Link>
            </button>
            <button className={`${styles.button} ${styles.signUp}`}>
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
