/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { createArticle, fetchSingleArticle, updateArticle } from "../../redux/services";

import styles from "./ArticleForm.module.scss";

const ArticleForm = ({ isEdit, button, title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { singleArticle } = useSelector((state) => state.articleReducer);
  const { user } = useSelector((state) => state.authorizationReducer);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [tags, setTags] = useState([""]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isEdit && slug) {
      dispatch(fetchSingleArticle(slug));
    } else {
      reset({
        title: "",
        shortDescription: "",
        text: "",
      });
      setTags([""]);
    }
  }, [dispatch, isEdit, slug]);

  useEffect(() => {
    if (sent) {
      history.push(isEdit ? `/articles/${slug}` : "/");
    }
  }, [sent, isEdit, history, slug]);

  const addTag = (e) => {
    e.preventDefault();
    setTags([...tags, ""]);
  };

  const removeTag = (index) => {
    const newTags = tags.slice();
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTagChange = (index, event) => {
    const newTags = tags.slice();
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const onSubmit = (data) => {
    const newArticle = {
      title: data.title,
      description: data.shortDescription,
      body: data.text,
      tagList: tags.filter((tag) => tag.trim() !== ""),
    };

    if (isEdit) {
      dispatch(updateArticle({ slug, article: newArticle, token: user.token }));
    } else {
      dispatch(createArticle({ data: newArticle, token: user.token })).then(() => {
        reset();
      });
    }

    setSent(true);
  };

  useEffect(() => {
    if (singleArticle && isEdit) {
      setValue("title", singleArticle.title);
      setValue("shortDescription", singleArticle.description);
      setValue("text", singleArticle.body);
      setTags(singleArticle.tagList || [""]);
    }
  }, [singleArticle, isEdit, setValue]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <label htmlFor="">
            <span className={styles.text}>Title</span>
            <input
              type="text"
              placeholder="Title"
              className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
              {...register("title", {
                required: "Title is required",
                value: singleArticle ? singleArticle.title : "",
              })}
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </label>

          <label htmlFor="">
            <span className={styles.text}>Short description</span>
            <input
              type="text"
              placeholder="Title"
              className={`${styles.input} ${errors.shortDescription ? styles.inputError : ""}`}
              {...register("shortDescription", {
                required: "Short description is required",
                value: singleArticle ? singleArticle.description : "",
              })}
            />
            {errors.shortDescription && <p className={styles.error}>{errors.shortDescription.message}</p>}
          </label>

          <label htmlFor="">
            <span className={styles.text}>Text</span>
            <textarea
              type="text"
              placeholder="Text"
              className={`${styles.input} ${styles.textarea} ${errors.text ? styles.inputError : ""}`}
              {...register("text", {
                required: "Text is required",
                value: singleArticle ? singleArticle.body : "",
              })}
            />
            {errors.text && <p className={styles.error}>{errors.text.message}</p>}
          </label>

          <label htmlFor="">
            <span className={styles.text}>Tags</span>
            <ul className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <li key={index} className={styles.item}>
                  <input
                    type="text"
                    value={tag}
                    className={styles.input}
                    onChange={(event) => handleTagChange(index, event)}
                    placeholder="Tag"
                  />
                  <button className={styles.deleteBtn} onClick={() => removeTag(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button className={styles.addBtn} onClick={addTag}>
              Add Tag
            </button>
          </label>

          <button type="submit" className={styles.button}>
            {button}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
