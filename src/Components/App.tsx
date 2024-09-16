import React from "react";
import "./App.css";
import MineGrid from "./MineGrid";

function App() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <MineGrid />
    </div>
  );
}

export default App;
