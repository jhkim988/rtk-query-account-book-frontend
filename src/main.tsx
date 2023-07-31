import React from "react";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App.tsx";

dayjs.extend(weekOfYear);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
