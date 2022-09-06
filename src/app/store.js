import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import storeReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    // reducers
    counter: counterReducer,
    posts: storeReducer,
  },
});
