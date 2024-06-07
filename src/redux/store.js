import { configureStore } from "@reduxjs/toolkit";

import articleReducer from "./slices/articleSlice";

const store = configureStore({
  reducer: {
    articleReducer,
  },
});

export default store;
