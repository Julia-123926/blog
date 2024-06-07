import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      // console.log({ articles, totalPages, articlesCount });
      return { articles, totalPages, articlesCount };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//       /articles/{slug} - Просмотр статьи с полным текстом.

export const fetchSingleArticle = createAsyncThunk(
  "singleArticle/fetchSingleArticle",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseAPI}/articles/${slug}`);
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const data = await res.json();
      console.log(data.article);
      return data.article;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

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
