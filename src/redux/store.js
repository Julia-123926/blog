import { configureStore } from "@reduxjs/toolkit";

import articleReducer from "./slices/articleSlice";
import authorizationReducer from "./slices/authorizationSlice";

const store = configureStore({
  reducer: {
    articleReducer,
    authorizationReducer,
  },
});

export default store;
