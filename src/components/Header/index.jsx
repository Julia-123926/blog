import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "../../redux/slices/authorizationSlice";

import styles from "./Header.module.scss";

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
            <Link className={`${styles.button} ${styles.create}`} to="/new-article">
              Create article
            </Link>
            <Link className={`${styles.button} ${styles.name}`} to="/profile">
              <span className={styles.username}>{user.username}</span>
              {user.image ? (
                <img className={styles.image} alt="user" src={user.image} />
              ) : (
                <img
                  className={styles.image}
                  alt="userImg"
                  src="https://static.productionready.io/images/smiley-cyrus.jpg"
                />
              )}
            </Link>
            <button onClick={handleLogout} className={`${styles.button} ${styles.logOut}`}>
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
