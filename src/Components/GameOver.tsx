import React from "react";

interface GameOverProps {
  gameWon: boolean;
}

function GameOver({ gameWon }: GameOverProps) {
  return (
    <div>
      {gameWon ? (
        <div className="Grid">
          <h1>CONGRATULATIONS, YOU WON!</h1>
          <button onClick={() => window.location.reload()}>
            Click Here to Restart
          </button>
        </div>
      ) : (
        <div className="Grid">
          <h1>YOU DETONATED A BOMB!</h1>
          <button onClick={() => window.location.reload()}>
            Click Here to Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default GameOver;

<div className="Grid">
  <h1>YOU DETONATED A BOMB!</h1>
  <button onClick={() => window.location.reload()}>
    Click Here to Restart
  </button>
</div>;
