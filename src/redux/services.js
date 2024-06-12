import { createAsyncThunk } from "@reduxjs/toolkit";

const baseAPI = " https://blog.kata.academy/api";
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${baseAPI}/articles?offset=${offset}&limit=${limit}`
      );
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const { articles, articlesCount } = await res.json();
      const totalPages = Math.ceil(articlesCount / 5);
      return { articles, totalPages, articlesCount };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchSingleArticle = createAsyncThunk(
  "singleArticle/fetchSingleArticle",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseAPI}/articles/${slug}`);
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const data = await res.json();
      // console.log(data.article);
      return data.article;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Register a new user/login a user
export const authorizeUser = createAsyncThunk(
  "authorization/authorizeUser",
  async ({ data, flag }, { rejectWithValue }) => {
    console.log(data);
    console.log(flag);
    const url = flag === "signIn" ? "/login" : "";
    try {
      const response = await fetch(`${baseAPI}/users${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const result = await response.json();
      return { user: result.user };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
