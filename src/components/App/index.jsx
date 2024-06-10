import React from "react";
import Header from "../Header";
import { Switch, Route } from "react-router-dom";
import ArticleContent from "../../pages/ArticleList/Article/ArticleContent";

import styles from "./App.module.scss";
import ArticleList from "../../pages/ArticleList";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import CreateArticle from "../../pages/CreateArticle";
import EditProfile from "../../pages/EditProfile";
const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/articles/:slug" component={ArticleContent} />
        <Route path="/create-article" component={CreateArticle} />
        <Route path="/profile" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default App;
