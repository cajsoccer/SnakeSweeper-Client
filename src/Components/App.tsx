import React from "react";
import "../App.css";
//import MineGrid from "./MineGrid";
import SnakeGrid from "./SnakeGrid";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <SnakeGrid />
    </div>
  );
}

export default App;
