import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../Components/Home";
import SnakeGrid from "../Components/Snake/SnakeGrid";
import MineGrid from "../Components/Mine/MineGrid";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/snake",
    element: <SnakeGrid />,
  },
  {
    path: "/minesweeper",
    element: <MineGrid />,
  },
]);
