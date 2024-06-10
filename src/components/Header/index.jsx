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
        {/* <div className={styles.authorization}>
          <button className={`${styles.button} ${styles.signIn}`}>
            <Link to="/sign-in">Sign In</Link>
          </button>

          <button className={`${styles.button} ${styles.signUp}`}>
            <Link to="/sign-up">Sign Up</Link>
          </button>
        </div> */}
        <div className={styles.success}>
          <button className={`${styles.button} ${styles.create}`}>
            Create article
          </button>
          <button className={`${styles.button} ${styles.name}`}>
            <Link to="/profile">John Doe</Link>
          </button>
          <button className={`${styles.button} ${styles.logOut}`}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
