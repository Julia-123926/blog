/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as id } from "uuid";
import { Button, Popconfirm } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import { fetchSingleArticle, deleteArticle, favoriteArticle, unfavoriteArticle } from "../../../../redux/services";
import { changeSingleArticle } from "../../../../redux/slices/articleSlice";

import styles from "./ArticleContent.module.scss";

const ArticleContent = () => {
  const dispatch = useDispatch();
  const singleArticle = useSelector((state) => state.articleReducer.singleArticle);
  const { user } = useSelector((state) => state.authorizationReducer);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSingleArticle({ slug, token: user?.token }));
  }, [slug, dispatch, user?.token]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteArticle({ slug, token: user.token }));
      history.push("/");
    } catch (error) {
      console.error("failed to delete the article:", error);
    }
  };

  const onFavoriteClick = async () => {
    if (!user.token) {
      history.push("/sign-in");
      return;
    }
    const updatedArticle = {
      ...singleArticle,
      favorited: !singleArticle.favorited,
      favoritesCount: singleArticle.favorited ? singleArticle.favoritesCount - 1 : singleArticle.favoritesCount + 1,
    };
    dispatch(changeSingleArticle(updatedArticle));

    try {
      if (singleArticle.favorited) {
        await dispatch(unfavoriteArticle({ slug, token: user.token })).unwrap();
      } else {
        await dispatch(favoriteArticle({ slug, token: user.token })).unwrap();
      }
    } catch (e) {
      dispatch(changeSingleArticle(singleArticle));
      console.error("failed to update the article: ", e);
    }
  };

  if (!singleArticle) return null;
  const { title, description, body, createdAt, favorited, favoritesCount, author, tagList } = singleArticle;

  const { username, image } = author;
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.top}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.heartWrapper}>
            {favorited ? (
              <HeartFilled className="heart" style={{ color: "red" }} onClick={onFavoriteClick} />
            ) : (
              <HeartOutlined className="heart" onClick={onFavoriteClick} />
            )}
            <div className="favoritesCount">{favoritesCount}</div>
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
        <ReactMarkdown className={styles.body} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {body}
        </ReactMarkdown>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <div className={styles.user}>
            <span className={styles.username}>{username}</span>
            <div className={styles.createdAt}>{format(new Date(createdAt), "MMMM d, yyyy")}</div>
          </div>
          <img className={styles.image} src={image} alt="img" />
        </div>
        {user.username === author.username && (
          <div className={styles.buttons}>
            <Link to={`/articles/${slug}/edit`}>
              <Button className={styles.green}>Edit</Button>
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
              placement="rightTop"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleContent;
