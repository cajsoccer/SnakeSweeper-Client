import React, { useState, useEffect } from "react";
import MineSquare from "./MineSquare";
import { MineSquareType } from "../Types";
import MineGameOver from "./MineGameOver";

function MineGrid() {
  const [squareList, setSquareList] = useState(() => getInitGrid(16));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [firstSquareClicked, setFirstSquareClicked] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(40);
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function getInitGrid(size: number) {
    let initialSquareList: MineSquareType[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        initialSquareList.push({
          x: i,
          y: j,
          adjacentBombs: 0,
          flipped: false,
          flagged: false,
          bomb: false,
          hovered: false,
        });
      }
    }
    for (let i = 0; i < 40; i++) {
      let randX = Math.floor(Math.random() * size);
      let randY = Math.floor(Math.random() * size);
      let randSquare = getSquare(randX, randY, initialSquareList);
      while (randSquare.bomb) {
        randX = Math.floor(Math.random() * size);
        randY = Math.floor(Math.random() * size);
        randSquare = getSquare(randX, randY, initialSquareList);
      }
      randSquare.bomb = true;
    }
    initialSquareList.forEach((ps) => {
      const adjacentSquares = initialSquareList.filter(
        (ss) =>
          Math.abs(ps.x - ss.x) <= 1 &&
          Math.abs(ps.y - ss.y) <= 1 &&
          !(ps.x === ss.x && ps.y === ss.y)
      );
      adjacentSquares.forEach((ss) => {
        if (ss.bomb) ps.adjacentBombs++;
      });
    });
    return initialSquareList;
  }

  function flipAdjacentSquares(x: number, y: number) {
    let tempList = [...squareList];
    let pivotSquare = getSquare(x, y, tempList);
    if (!pivotSquare.bomb) {
      pivotSquare.flipped = true;
      if (pivotSquare.flagged) {
        pivotSquare.flagged = false;
      }
      setSquareList([...tempList]);
      setFlagsLeft(40 - squareList.filter((s) => s.flagged).length);
      tempList = [...squareList];
      pivotSquare = getSquare(x, y, tempList);
      if (pivotSquare.adjacentBombs === 0) {
        const adjacentSquares = tempList.filter(
          (s) =>
            Math.abs(pivotSquare.x - s.x) <= 1 &&
            Math.abs(pivotSquare.y - s.y) <= 1 &&
            !(pivotSquare.x === s.x && pivotSquare.y === s.y)
        );
        adjacentSquares.forEach((s) => {
          if (!s.flipped) {
            flipAdjacentSquares(s.x, s.y);
          }
        });
      }
    }
  }

  function gridLeftClickUpdate(x: number, y: number) {
    if (!gameOver) {
      let tempList = [...squareList];
      let clickedSquare = getSquare(x, y, tempList);
      if (clickedSquare.flagged) {
        return;
      }
      if (!firstSquareClicked) {
        while (clickedSquare.bomb) {
          tempList = getInitGrid(16);
          clickedSquare = getSquare(x, y, tempList);
        }
        setFirstSquareClicked(true);
        setTimer(0);
      }
      clickedSquare.flipped = true;
      if (clickedSquare.bomb) {
        const bombSound = new Audio(`./sounds/explosion.mp3`);
        bombSound.play();
        endGame(false);
      }
      setSquareList([...tempList]);
      if (clickedSquare.adjacentBombs === 0) {
        flipAdjacentSquares(x, y);
      }
      if (squareList.filter((s) => !s.bomb && !s.flipped).length === 0) {
        endGame(true);
      }
    }
  }

  function gridRightClickUpdate(x: number, y: number) {
    if (!gameOver && firstSquareClicked) {
      let tempList = [...squareList];
      const clickedSquare = getSquare(x, y, tempList);
      if (clickedSquare.flagged) {
        clickedSquare.flagged = false;
      } else {
        if (flagsLeft > 0) {
          clickedSquare.flagged = true;
        }
      }
      setSquareList([...tempList]);
      setFlagsLeft(40 - squareList.filter((s) => s.flagged).length);
    }
  }

  function getSquare(x: number, y: number, list: MineSquareType[]) {
    return list.filter((s) => s.x === x && s.y === y)[0];
  }

  function endGame(gameWon: boolean) {
    if (gameWon) {
      setGameOver(true);
      setGameWon(true);
    } else {
      setGameOver(true);
    }
    setFinalTime(getTime());
  }

  function getTime() {
    const minutes = Math.floor(timer / 60);
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = timer % 60;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesStr}:${secondsStr}`;
  }

  return (
    <div>
      <h1>MINESWEEPER</h1>
      <h2>{flagsLeft} BOMBS UNMARKED</h2>
      {firstSquareClicked && !gameOver ? (
        <h2>TIME ELAPSED: {getTime()}</h2>
      ) : (
        <div></div>
      )}
      <div className="Grid">
        {squareList.map((square, index) => (
          <MineSquare
            key={index}
            square={square}
            leftClick={gridLeftClickUpdate}
            rightClick={gridRightClickUpdate}
          />
        ))}{" "}
      </div>
      {gameOver ? (
        <MineGameOver gameWon={gameWon} finalTime={finalTime} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MineGrid;
