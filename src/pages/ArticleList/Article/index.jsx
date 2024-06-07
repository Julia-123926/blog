import React from "react";
import styles from "./Article.module.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const Article = (article) => {
  const {
    slug,
    title,
    description,
    tags,
    createdAt,
    favourited,
    favoritesCount,
    author,
  } = article;
  const { username, image } = author;
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.top}>
          <Link to={`/articles/${article.slug}`}>
            <h4 className={styles.title}>{title}</h4>
          </Link>
          <button className={styles.favourited}>{favourited}</button>
          <div className={styles.favoritesCount}>{favoritesCount}</div>
        </div>
        <div className={styles.tags}>{tags}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.username}>{username}</span>
          <span className={styles.createdAt}>
            {format(new Date(createdAt), "MMMM d, yyyy")}
          </span>
        </div>
        <img className={styles.image} src={image} alt="img" />
      </div>
    </div>
  );
};

export default Article;
