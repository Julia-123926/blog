import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorizeUser } from "../services";
import { updateUser } from "../services";

const initialState = {
  user: {
    username: null,
    password: null,
    email: null,
    image: null,
    // repeatPassword: null,
    // isValid: null,
    token: null,
    bio: null,
  },
  loading: false,
  error: null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      const { email, token, username, bio, image } = action.payload;
      state.user.email = email;
      state.user.token = token;
      state.user.username = username;
      // state.bio = bio;
      // state.image = image;
    },
    logOut(state) {
      state.user = { username: null, password: null, email: null, image: null };
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizeUser.fulfilled, (state, action) => {
      // console.log("fulfilled");
      const { user } = action.payload;
      state.status = "fulfilled";
      state.user = {
        username: user.username,
        email: user.email,
        token: user.token,
        password: user.password,
      };
      localStorage.setItem("user", JSON.stringify(user));
    });
    builder.addCase(authorizeUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // console.log("fulfilled");
      const { user } = action.payload;
      state.status = "fulfilled";
      state.user = {
        username: user.username,
        email: user.email,
        token: user.token,
        password: user.password,
        bio: user.bio,
        image: user.image,
      };
      // localStorage.setItem("user", JSON.stringify(user));
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { setUser, logOut } = authorizationSlice.actions;
export default authorizationSlice.reducer;

// {
//   "user": {
//       "username": "testuser",
//       "email": "test@test.test",
//       password: testtest
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Njk1ZTRhZWYwMzkxMWIwMGFlZGU1NiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE3MjMzNjU0NTAsImlhdCI6MTcxODE4MTQ1MH0.iaL0hb5wOTj2tmk4ZHm3Nu38m2DKcGrVHf69Fw1cjHg"
//   }
// }
