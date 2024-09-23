import React, { useState, useEffect } from "react";
import SnakeSquare from "./SnakeSquare";
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
    function updateFruit(list: SnakeSquareType[], x: number, y: number) {
      list.filter((s) => s.fruit)[0].fruit = false;
      let randSquare = getSquare(
        list,
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16)
      );
      while (randSquare.x === x && randSquare.y === y) {
        randSquare = getSquare(
          list,
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16)
        );
      }
      randSquare.fruit = true;
    }

    function findTail(list: SnakeSquareType[]) {
      let tail: SnakeSquareType = {} as SnakeSquareType;
      let maxTail = 0;
      list.forEach((s) => {
        if (s.bodyPos > maxTail) {
          tail = s;
          maxTail = s.bodyPos;
        }
      });
      return tail;
    }

    const interval = setInterval(() => {
      if (!gamePaused) {
        let tempSquareList = structuredClone(squareList);
        let prevHead = tempSquareList.filter((s) => s.head)[0];
        let prevBody = tempSquareList.filter((s) => s.bodyPos > 0);
        prevHead.head = false;
        switch (headDirection) {
          case "left": {
            const nextHead = tempSquareList.filter(
              (s) => s.x === prevHead.x && s.y === prevHead.y - 1
            )[0];
            if (prevHead.y === 0 || prevBody.includes(nextHead)) {
              setGameOver(true);
            } else {
              nextHead.head = true;
              prevHead.bodyPos = 1;
              prevBody.forEach((s) => s.bodyPos++);
              if (nextHead.fruit) {
                updateFruit(tempSquareList, nextHead.x, nextHead.y);
                setScore(score + 1);
              } else {
                let tail = findTail(tempSquareList);
                if (tail) {
                  tail.bodyPos = 0;
                }
              }
              setSquareList(tempSquareList);
            }
            return;
          }
          case "right": {
            const nextHead = tempSquareList.filter(
              (s) => s.x === prevHead.x && s.y === prevHead.y + 1
            )[0];
            if (
              prevHead.y === Math.sqrt(tempSquareList.length) - 1 ||
              prevBody.includes(nextHead)
            ) {
              setGameOver(true);
            } else {
              nextHead.head = true;
              prevHead.bodyPos = 1;
              prevBody.forEach((s) => s.bodyPos++);
              if (nextHead.fruit) {
                updateFruit(tempSquareList, nextHead.x, nextHead.y);
                setScore(score + 1);
              } else {
                let tail = findTail(tempSquareList);
                if (tail) {
                  tail.bodyPos = 0;
                }
              }
              setSquareList(tempSquareList);
            }
            return;
          }
          case "up": {
            const nextHead = tempSquareList.filter(
              (s) => s.x === prevHead.x - 1 && s.y === prevHead.y
            )[0];
            if (prevHead.x === 0 || prevBody.includes(nextHead)) {
              setGameOver(true);
            } else {
              nextHead.head = true;
              prevHead.bodyPos = 1;
              prevBody.forEach((s) => s.bodyPos++);
              if (nextHead.fruit) {
                updateFruit(tempSquareList, nextHead.x, nextHead.y);
                setScore(score + 1);
              } else {
                let tail = findTail(tempSquareList);
                if (tail) {
                  tail.bodyPos = 0;
                }
              }
              setSquareList(tempSquareList);
            }
            return;
          }
          case "down":
            const nextHead = tempSquareList.filter(
              (s) => s.x === prevHead.x + 1 && s.y === prevHead.y
            )[0];
            if (
              prevHead.x === Math.sqrt(tempSquareList.length) - 1 ||
              prevBody.includes(nextHead)
            ) {
              setGameOver(true);
            } else {
              nextHead.head = true;
              prevHead.bodyPos = 1;
              prevBody.forEach((s) => s.bodyPos++);
              if (nextHead.fruit) {
                updateFruit(tempSquareList, nextHead.x, nextHead.y);
                setScore(score + 1);
              } else {
                let tail = findTail(tempSquareList);
                if (tail) {
                  tail.bodyPos = 0;
                }
              }
              setSquareList(tempSquareList);
            }
            return;
          default:
            return;
        }
      }
    }, 75);
    return () => clearInterval(interval);
  }, [squareList, headDirection, gamePaused, score]);

  function getInitGrid(size: number) {
    let initialSquareList: SnakeSquareType[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        initialSquareList.push({
          x: i,
          y: j,
          bodyPos: 0,
          head: false,
          fruit: false,
        });
      }
    }
    const head = initialSquareList.filter((s) => s.x === 8 && s.y === 8)[0];
    console.log(head);
    head.head = true;
    let firstFruit = getSquare(
      initialSquareList,
      Math.floor(Math.random() * 16),
      Math.floor(Math.random() * 16)
    );
    while (firstFruit.x === head.x && firstFruit.y === head.y) {
      firstFruit = getSquare(
        initialSquareList,
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16)
      );
    }
    firstFruit.fruit = true;
    return initialSquareList;
  }

  function getSquare(list: SnakeSquareType[], x: number, y: number) {
    return list.filter((s) => s.x === x && s.y === y)[0];
  }

  return (
    <div>
      <h1>SNAKE</h1>
      {!gameOver && score > 0 ? <h2>FRUITS EATEN: {score}</h2> : <div></div>}
      <div className="Grid">
        {squareList.map((square, index) => (
          <SnakeSquare key={index} square={square} />
        ))}
      </div>
      {gameOver ? <SnakeGameOver score={score} /> : <div></div>}
    </div>
  );
}

export default SnakeGrid;
