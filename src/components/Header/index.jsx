import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">
          <div className={styles.title}>Realworld Blog</div>
        </Link>
        <div className={styles.authorization}>
          <button className={`${styles.button} ${styles.signIn}`}>
            Sign In
          </button>
          <button className={`${styles.button} ${styles.signUp}`}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
