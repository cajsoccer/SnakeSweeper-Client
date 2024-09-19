import React, { useState, useEffect } from "react";
import SnakeRow from "./SnakeRow";
import { SnakeSquareType } from "../Types";
import SnakeGameOver from "./SnakeGameOver";

function SnakeGrid() {
  const [squareList, setSquareList] = useState(() => getInitGrid(16));
  const [gamePaused, setGamePaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [headDirection, setHeadDirection] = useState("left");

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (headDirection !== "right") {
          setHeadDirection("left");
        }
        break;
      case "ArrowRight":
        if (headDirection !== "left") {
          console.log(headDirection);
          setHeadDirection("right");
        }
        break;
      case "ArrowDown":
        if (headDirection !== "up") {
          setHeadDirection("down");
        }
        break;
      case "ArrowUp":
        if (headDirection !== "down") {
          setHeadDirection("up");
        }
        break;
      case " ":
        setGamePaused(!gamePaused);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    function updateFruit(currFruitPos: number) {
      let randFruitPos = Math.floor(Math.random() * 256) + 1;
      while (
        getCurrentSnake().includes(randFruitPos) ||
        currFruitPos === randFruitPos
      ) {
        randFruitPos = Math.floor(Math.random() * 256) + 1;
      }
      let tempList = [...squareList];
      for (let i = 0; i < tempList.length; i++)
        for (let j = 0; j < tempList.length; j++) {
          if (tempList[i][j].id === randFruitPos) {
            tempList[i][j].fruit = true;
          }
          if (tempList[i][j].id === currFruitPos) {
            tempList[i][j].fruit = false;
          }
        }
      setSquareList(tempList);
    }

    function getCurrentSnake() {
      let snakeList = [];
      for (let i = 0; i < squareList.length; i++)
        for (let j = 0; j < squareList.length; j++)
          if (squareList[i][j].head || squareList[i][j].tail) {
            snakeList.push(squareList[i][j].id);
          }
      return snakeList;
    }

    const interval = setInterval(() => {
      if (!gamePaused) {
        let tempSquareList = [...squareList];
        for (let i = 0; i < tempSquareList.length; i++)
          for (let j = 0; j < tempSquareList.length; j++)
            if (tempSquareList[i][j].head) {
              tempSquareList[i][j].head = false;
              switch (headDirection) {
                case "left":
                  if (i === 0) {
                    setGameOver(true);
                  } else {
                    tempSquareList[i - 1][j].head = true;
                    setSquareList(tempSquareList);
                    if (tempSquareList[i - 1][j].fruit) {
                      setScore(score + 1);
                      updateFruit(tempSquareList[i - 1][j].id);
                    }
                  }
                  return;
                case "right":
                  if (i === squareList.length - 1) {
                    setGameOver(true);
                  } else {
                    tempSquareList[i + 1][j].head = true;
                    setSquareList(tempSquareList);
                    if (tempSquareList[i + 1][j].fruit) {
                      setScore(score + 1);
                      updateFruit(tempSquareList[i + 1][j].id);
                    }
                  }
                  return;
                case "down":
                  if (j === squareList.length - 1) {
                    setGameOver(true);
                  } else {
                    tempSquareList[i][j + 1].head = true;
                    setSquareList(tempSquareList);
                    if (tempSquareList[i][j + 1].fruit) {
                      setScore(score + 1);
                      updateFruit(tempSquareList[i][j + 1].id);
                    }
                  }
                  return;
                case "up":
                  if (j === 0) {
                    setGameOver(true);
                  } else {
                    tempSquareList[i][j - 1].head = true;
                    setSquareList(tempSquareList);
                    if (tempSquareList[i][j - 1].fruit) {
                      setScore(score + 1);
                      updateFruit(tempSquareList[i][j - 1].id);
                    }
                  }
                  return;
                default:
                  return;
              }
            }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [squareList, headDirection, gamePaused, score]);

  function getInitGrid(size: number) {
    let initialSquareList: SnakeSquareType[][] = [];
    for (let i = 0; i < size; i++) {
      let tempRow: SnakeSquareType[] = [];
      for (let j = 0; j < size; j++) {
        tempRow.push({
          id: i * size + j + 1,
          xPos: i,
          yPos: j,
          head: false,
          tail: false,
          fruit: false,
        });
      }
      initialSquareList.push(tempRow);
    }
    initialSquareList[8][8].head = true;
    let randFruitPos = Math.floor(Math.random() * 256) + 1;
    while (randFruitPos === 137)
      randFruitPos = Math.floor(Math.random() * 256) + 1;
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        if (initialSquareList[i][j].id === randFruitPos) {
          initialSquareList[i][j].fruit = true;
        }
    return initialSquareList;
  }

  return (
    <div className="Grid">
      <h1>SNAKE</h1>
      {!gameOver && score > 0 ? <h2>FRUITS EATEN: {score}</h2> : <div></div>}
      {squareList.map((row, index) => (
        <SnakeRow key={index} row={row} />
      ))}
      {gameOver ? <SnakeGameOver score={score} /> : <div></div>}
    </div>
  );
}

export default SnakeGrid;
