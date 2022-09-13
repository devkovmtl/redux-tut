import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// import storeReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    // reducers
    counter: counterReducer,
    // posts: storeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
