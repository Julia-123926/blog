import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../redux/slices/articleSlice";
import { v4 as id } from "uuid";
import { Link } from "react-router-dom";
import { Pagination, Spin, Alert } from "antd";
import { setPage } from "../../redux/slices/articleSlice";

import styles from "./ArticleList.module.scss";
import Article from "./Article";

const ArticleList = () => {
  const { currentPage, totalPages, articlesCount, status } = useSelector(
    (state) => state.articleReducer
  );
  const dispatch = useDispatch();
  const articlesList = useSelector((state) => state.articleReducer.articles);

  useEffect(() => {
    const offset = (currentPage - 1) * 5;
    dispatch(fetchArticles({ offset, limit: 5 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    // const offset = (page - 1) * 5;
    // dispatch(fetchArticles({ offset, limit: 5 }));
  };

  return (
    <>
      {status === "loading" && <Spin className={styles.spin} size="large" />}
      {status === "failed" && (
        <Alert
          message={"Не удалось загрузить статьи, повторите попытку позже"}
          type="info"
        />
      )}
      <ul className={styles.list}>
        {articlesList.map((article) => (
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
    </>
  );
};

export default ArticleList;
