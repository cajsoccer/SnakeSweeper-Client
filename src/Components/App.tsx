import React from "react";
import "../App.css";
import Header from "./Header";
import { router } from "../Routes/Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
