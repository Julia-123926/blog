import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      const response = await axios.post(
        `${baseAPI}/users${url}`,
        {
          user: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return { user: response.data.user };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ error: "No response received" });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

//Update current user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseAPI}/user`,
        {
          user: {
            email: data.email,
            username: data.username,
            bio: data.bio,
            password: data.password,
            image: data.image || null,
          },
          // bio: data.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { user: response.data.user };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : new Error(error.message)
      );
    }
  }
);

// post article
export const createArticle = async (data, token) => {
  // console.log(data);
  // console.log(token);
  try {
    const response = await axios.post(
      `${baseAPI}/articles`,
      {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: [],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {}
};
