import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseAPI = " https://blog.kata.academy/api";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ offset = 0, limit = 5, token }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    try {
      const url = `${baseAPI}/articles?offset=${offset}&limit=${limit}`;
      const res = await axios.get(url, { headers });
      const { articles, articlesCount } = await res.data;
      const totalPages = Math.ceil(articlesCount / limit);
      return { articles, totalPages, articlesCount };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchSingleArticle = createAsyncThunk(
  "singleArticle/fetchSingleArticle",
  async ({ slug, token }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    try {
      const url = `${baseAPI}/articles/${slug}`;
      const res = await axios.get(url, { headers });
      return res.data.article;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Register a new user/login a user
export const authorizeUser = createAsyncThunk(
  "authorization/authorizeUser",
  async ({ data, flag }, { rejectWithValue }) => {
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
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// Update current user
export const updateUser = createAsyncThunk("user/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${baseAPI}/user`,
      {
        user: {
          email: data.email,
          username: data.username,
          password: data.password,
          image: data.avatar || null,
        },
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
    return rejectWithValue(error.response ? error.response.data : new Error(error.message));
  }
});

// post article

export const createArticle = createAsyncThunk("article/createArticle", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${baseAPI}/articles`,
      {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList || [],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

// delete  an article
export const deleteArticle = createAsyncThunk("article/deleteArticle", async ({ slug, token }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseAPI}/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

// Update an article
export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ slug, article, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseAPI}/articles/${slug}`,
        { article },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Favorite an article
export const favoriteArticle = createAsyncThunk(
  "article/favoriteArticle",
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseAPI}/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Unfavorite an article
export const unfavoriteArticle = createAsyncThunk(
  "article/unfavoriteArticle",
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseAPI}/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
