import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid";
import GameOver from "./GameOver";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  function gameEnd(gameWon: boolean) {
    if (gameWon) {
      setGameOver(true);
      setGameWon(true);
    } else {
      setGameOver(true);
    }
  }
  return (
    <div>
      <Grid gameOver={gameOver} gameEnd={gameEnd} />
      {gameOver ? <GameOver gameWon={gameWon} /> : <div></div>}
    </div>
  );
}

export default App;
