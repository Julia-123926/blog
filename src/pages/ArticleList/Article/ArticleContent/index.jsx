import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import styles from "./ArticleContent.module.scss";
import { fetchSingleArticle } from "../../../../redux/slices/articleSlice";
import { format } from "date-fns";

const ArticleContent = () => {
  const singleArticle = useSelector(
    (state) => state.articleReducer.singleArticle
  );
  console.log(singleArticle);
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [slug, dispatch]);

  if (!singleArticle) return null;
  const {
    title,
    description,
    body,
    tags,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    author,
  } = singleArticle;

  const { username, image } = author;
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.top}>
          <h4 className={styles.title}>{title}</h4>
          <button className={styles.favourited}>{favorited}</button>
          <div className={styles.favoritesCount}>{favoritesCount}</div>
        </div>
        <div className={styles.tags}>{tags}</div>
        <div className={styles.description}>{description}</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {body.split(" ").slice(0, 300).join(" ")}
        </ReactMarkdown>
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

export default ArticleContent;
