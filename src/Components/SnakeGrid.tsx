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
  const [fruitNum, setFruitNum] = useState(Math.ceil(Math.random() * 3));

  useEffect(() => {
    function updateHeadDirection(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowLeft":
          if (headDirection !== "right") {
            setHeadDirection("left");
          }
          break;
        case "ArrowRight":
          if (headDirection !== "left") {
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
    }
    document.addEventListener("keydown", updateHeadDirection);
    return function () {
      document.removeEventListener("keydown", updateHeadDirection);
    };
  }, [gamePaused, headDirection]);

  useEffect(() => {
    function updateFruit(list: SnakeSquareType[]) {
      let prevFruit = list.filter((s) => s.fruit)[0];
      let prevHead = list.filter((s) => s.head)[0];
      let prevBody = list.filter((s) => s.bodyPos > 0);
      let nextFruit = getSquare(
        list,
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16)
      );
      while (
        nextFruit === prevFruit ||
        nextFruit === prevHead ||
        prevBody.includes(nextFruit)
      ) {
        nextFruit = getSquare(
          list,
          Math.floor(Math.random() * 16),
          Math.floor(Math.random() * 16)
        );
      }
      prevFruit.fruit = false;
      nextFruit.fruit = true;
      setFruitNum(Math.ceil(Math.random() * 3));
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
      if (!gamePaused && !gameOver) {
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
                updateFruit(tempSquareList);
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
                updateFruit(tempSquareList);
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
                updateFruit(tempSquareList);
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
                updateFruit(tempSquareList);
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
  }, [squareList, headDirection, gamePaused, gameOver, score]);

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
    let firstFruit = getSquare(
      initialSquareList,
      Math.floor(Math.random() * 16),
      Math.floor(Math.random() * 16)
    );
    while (firstFruit === head) {
      firstFruit = getSquare(
        initialSquareList,
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16)
      );
    }
    head.head = true;
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
          <SnakeSquare
            key={index}
            square={square}
            fruitNum={fruitNum}
            headDirection={headDirection}
          />
        ))}
      </div>
      {gameOver ? <SnakeGameOver score={score} /> : <div></div>}
    </div>
  );
}

export default SnakeGrid;
