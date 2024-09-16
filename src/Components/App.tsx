import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid";
import GameOver from "./GameOver";

function App() {
  const [gameOver, setGameOver] = useState(false);
  return (
    <div>
      {gameOver ? (
        <GameOver setGameOver={setGameOver} />
      ) : (
        <Grid setGameOver={setGameOver} />
      )}
    </div>
  );
}

export default App;
