import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

// as soon as app start fetch user
store.dispatch(fetchUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
