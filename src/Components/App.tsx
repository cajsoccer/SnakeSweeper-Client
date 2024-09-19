import React from "react";
import "../App.css";
//import MineGrid from "./MineGrid";
import SnakedGrid from "./SnakeGrid";

function App() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <SnakedGrid />
    </div>
  );
}

export default App;
