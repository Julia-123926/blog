/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */

import React from "react";
import { v4 as id } from "uuid";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { favoriteArticle, unfavoriteArticle } from "../../../redux/services";
import { changeArticle } from "../../../redux/slices/articleSlice";

import styles from "./Article.module.scss";

const Article = (article) => {
  const { user } = useSelector((state) => state.authorizationReducer);
  const dispatch = useDispatch();

  const { title, description, tagList, createdAt, favorited, favoritesCount, author, slug } = article;
  const { username, image } = author;
  const history = useHistory();

  const onFavoriteClick = async () => {
    if (!user.token) {
      history.push("/sign-in");
      return;
    }
    const updatedArticle = {
      ...article,
      favorited: !favorited,
      favoritesCount: favorited ? favoritesCount - 1 : favoritesCount + 1,
    };
    dispatch(changeArticle(updatedArticle));

    try {
      if (favorited) {
        await dispatch(unfavoriteArticle({ slug, token: user.token })).unwrap();
      } else {
        await dispatch(favoriteArticle({ slug, token: user.token })).unwrap();
      }
    } catch (e) {
      dispatch(changeArticle(article));
    }
  };

  const isImageUrlValid = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.top}>
          <Link to={`/articles/${slug}`}>
            <h4 className={styles.title}>{title}</h4>
          </Link>
          <div className={styles.heartWrapper}>
            {favorited ? (
              <HeartFilled className="heart" style={{ color: "red" }} onClick={onFavoriteClick} />
            ) : (
              <HeartOutlined className="heart" onClick={onFavoriteClick} />
            )}
            <div className={styles.favoritesCount}>{favoritesCount}</div>
          </div>
        </div>
        <div className={styles.tags}>
          {tagList.map((tag) => (
            <span key={id()} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.username}>{username}</span>
          <span className={styles.createdAt}>{format(new Date(createdAt), "MMMM d, yyyy")}</span>
        </div>
        {image && isImageUrlValid(image) ? (
          <img className={styles.image} src={image} alt="img" />
        ) : (
          <img className={styles.image} src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="img" />
        )}
      </div>
    </div>
  );
};

export default Article;
