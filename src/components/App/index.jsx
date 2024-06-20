import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../Header";
import ArticleContent from "../../pages/ArticleList/Article/ArticleContent";
import { setUser } from "../../redux/slices/authorizationSlice";
import ArticleList from "../../pages/ArticleList";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import EditProfile from "../../pages/EditProfile";
import ProtectedRoute from "../ProtectedRoute";
import EditArticle from "../../pages/EditArticle";
import CreateArticle from "../../pages/CreateArticle";

import styles from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/articles/:slug/edit" component={EditArticle} />
        <Route path="/articles/:slug" component={ArticleContent} />
        <ProtectedRoute path="/new-article" component={CreateArticle} />
        <Route path="/profile" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default App;
