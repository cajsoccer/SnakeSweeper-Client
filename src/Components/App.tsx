import React from "react";
import "../App.css";
import SnakeGrid from "./SnakeGrid";
//import MineGrid from "./MineGrid";

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
