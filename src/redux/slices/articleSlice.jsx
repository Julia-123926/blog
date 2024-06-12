import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticles, fetchSingleArticle } from "../services";

const initialState = {
  articles: [],
  status: "idle",
  singleArticle: null,
  currentPage: 1,
  totalPages: null,
  articlesCount: 0,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.articles = action.payload.articles;
      state.totalPages = action.payload.totalPages;
      state.articlesCount = action.payload.articlesCount;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(fetchSingleArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleArticle.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.singleArticle = action.payload;
    });
    builder.addCase(fetchSingleArticle.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { setPage, setTotalPages } = articleSlice.actions;
export default articleSlice.reducer;
