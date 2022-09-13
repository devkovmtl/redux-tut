import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";
import { extendedApiSlice } from "./features/posts/postsSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

// as soon as app start fetch user
store.dispatch(fetchUsers());
// store.dispatch(fetchPosts());
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
