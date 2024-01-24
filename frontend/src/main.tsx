import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./contextAPI/UsersContextt.tsx";
import { MessagesProvider } from "./contextAPI/MessagesContext.tsx";
//import {routers} from '../routers.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UsersProvider>
          <MessagesProvider>
            <App />
          </MessagesProvider>
        </UsersProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
