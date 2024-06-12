import React, { useEffect } from "react";
import Header from "../Header";
import { Switch, Route } from "react-router-dom";
import ArticleContent from "../../pages/ArticleList/Article/ArticleContent";
import { setUser } from "../../redux/slices/authorizationSlice";

import styles from "./App.module.scss";
import ArticleList from "../../pages/ArticleList";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import CreateArticle from "../../pages/CreateArticle";
import EditProfile from "../../pages/EditProfile";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
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
        <Route path="/articles/:slug" component={ArticleContent} />
        <Route path="/articles/:slug/edit" component={ArticleContent} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/profile" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default App;
