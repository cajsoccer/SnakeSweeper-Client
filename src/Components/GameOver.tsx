import React from "react";

interface GameOverProps {
  setGameOver: (gameOver: boolean) => void;
}

function GameOver({ setGameOver }: GameOverProps) {
  return (
    <div className="Grid">
      <h1>YOU DETONATED A BOMB!</h1>
      <button onClick={() => setGameOver(false)}>Click Here to Restart</button>
    </div>
  );
}

export default GameOver;
