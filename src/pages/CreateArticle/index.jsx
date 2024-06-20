import React from "react";

import ArticleForm from "../ArticleForm";

const createArticle = () => {
  return <ArticleForm button="Send" title="Create new article" isEdit={false} />;
};

export default createArticle;
