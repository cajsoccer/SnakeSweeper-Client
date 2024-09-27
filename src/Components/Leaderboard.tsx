import React from "react";
import ScoreList from "./ScoreList";

const snakeScores = [
  {
    user: "Carter",
    score: 5,
  },
  {
    user: "Ben",
    score: 10,
  },
  {
    user: "Kyle",
    score: 15,
  },
];

const minesweeperScores = [
  {
    user: "Carter",
    score: 5,
  },
  {
    user: "Ben",
    score: 10,
  },
  {
    user: "Kyle",
    score: 15,
  },
];

function Leaderboard() {
  return (
    <div>
      <h1>User Leaderboard</h1>
      <ScoreList game="Snake" scores={snakeScores} />
      <ScoreList game="Minesweeper" scores={minesweeperScores} />
    </div>
  );
}

export default Leaderboard;
