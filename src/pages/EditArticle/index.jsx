import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as id } from "uuid";

import { updateUser } from "../../redux/services";

import styles from "./EditArticle.module.scss";

const EditArticle = () => {
  const [tags, setTags] = useState([""]);
  const addTag = () => {
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(updateUser({ data }));
    reset();
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <div className={styles.info}>
          <h3 className={styles.title}>Edit article</h3>

          <label htmlFor="">
            <span className={styles.text}>Title</span>
            <input
              type="text"
              placeholder="Title"
              className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
              {...register("title", {
                required: "Title is required",
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
              })}
            />
            {errors.shortDescription && <p className={styles.error}>{errors.shortDescription.message}</p>}
          </label>

          <label htmlFor="">
            <span className={styles.text}>Text</span>
            <textarea
              type="text"
              placeholder="Text"
              className={`${styles.input} ${errors.text ? styles.inputError : ""}`}
              {...register("text", {
                required: "Text is required",
              })}
            />
            {errors.text && <p className={styles.error}>{errors.text.message}</p>}
          </label>

          <label htmlFor="">
            <span className={styles.text}>Tags</span>
            <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <div key={id()} className={styles.item}>
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
                </div>
              ))}
            </div>
            <button className={styles.addBtn} onClick={addTag}>
              Add Tag
            </button>
          </label>

          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
