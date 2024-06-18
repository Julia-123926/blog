import { createSlice } from "@reduxjs/toolkit";

import {
  fetchArticles,
  fetchSingleArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  favoriteArticle,
  unfavoriteArticle,
} from "../services";

const initialState = {
  articles: [],
  status: null,
  singleArticle: null,
  currentPage: 1,
  totalPages: null,
  articlesCount: 0,
  favoriteStatuses: {},
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    changeArticle: (state, action) => {
      const { slug, favorited, favoritesCount } = action.payload;
      const article = state.articles.find((item) => item.slug === slug);
      if (article) {
        article.favorited = favorited;
        article.favoritesCount = favoritesCount;
      }
    },
    changeSingleArticle: (state, action) => {
      state.singleArticle = {
        ...state.singleArticle,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.singleArticle = action.payload;
      })
      .addCase(fetchSingleArticle.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.articles.push(action.payload.article);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.singleArticle = null;
        state.status = "succeeded";
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.singleArticle = action.payload.article;
        state.status = "succeeded";
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.article.slug ? action.payload.article : article
        );
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.article.slug ? action.payload.article : article
        );
      })
      .addCase(unfavoriteArticle.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setPage, setTotalPages, changeArticle, changeSingleArticle } = articleSlice.actions;
export default articleSlice.reducer;
