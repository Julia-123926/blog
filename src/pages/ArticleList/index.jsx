import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as id } from "uuid";
import { Pagination, Spin, Alert } from "antd";

import { fetchArticles } from "../../redux/services";
import { setPage } from "../../redux/slices/articleSlice";

import styles from "./ArticleList.module.scss";
import Article from "./Article";

const ArticleList = () => {
  const { currentPage, articlesCount, status, articles } = useSelector((state) => state.articleReducer);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorizationReducer);

  useEffect(() => {
    const offset = (currentPage - 1) * 5;
    if (user.token) {
      dispatch(fetchArticles({ offset, limit: 5, token: user.token }));
    } else dispatch(fetchArticles({ offset, limit: 5 }));
  }, [dispatch, currentPage, user]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <main>
      {status === "loading" && <Spin className={styles.spin} size="large" />}
      {status === "rejected" && <Alert message="Не удалось загрузить статьи, повторите попытку позже" type="info" />}
      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={id()} className={styles.item}>
            <Article {...article} />
          </li>
        ))}
        <Pagination
          pageSize={5}
          current={currentPage}
          className={styles.pagination}
          total={articlesCount}
          onChange={handlePageChange}
        />
      </ul>
    </main>
  );
};

export default ArticleList;
