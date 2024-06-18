import { createSlice } from "@reduxjs/toolkit";

import { authorizeUser, updateUser } from "../services";

const initialState = {
  user: {
    username: null,
    password: null,
    email: null,
    image: null,
    token: null,
  },
  loading: false,
  error: null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, token, username, image } = action.payload;
      state.user.email = email;
      state.user.token = token;
      state.user.username = username;
      state.user.image = image;
    },
    logOut(state) {
      state.user = { username: null, password: null, email: null, image: null };
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizeUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authorizeUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.loading = false;
      state.user = {
        username: user.username,
        email: user.email,
        token: user.token,
        password: user.password,
        image: user.image,
      };
      localStorage.setItem("user", JSON.stringify(user));
    });
    builder.addCase(authorizeUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.loading = false;
      state.user = {
        username: user.username,
        email: user.email,
        token: user.token,
        password: user.password,
        bio: user.bio,
        image: user.image,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, logOut } = authorizationSlice.actions;
export default authorizationSlice.reducer;
