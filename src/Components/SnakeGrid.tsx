import React, { useState } from "react";
import SnakeRow from "./SnakeRow";
import { SnakeSquareType } from "../Types";

function SnakeGrid() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        headDirection = "left";
        break;
      case "ArrowRight":
        headDirection = "right";
        break;
      case "ArrowDown":
        headDirection = "down";
        break;
      case "ArrowUp":
        headDirection = "up";
        break;
      case " ":
        gamePaused = !gamePaused;
        break;
      default:
        break;
    }
  });

  //setInterval(() => updateGrid(), 1000);

  let headDirection = "left";
  let gamePaused = true;
  const [squareList, setSquareList] = useState(() => getInitGrid(16));

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
    return initialSquareList;
  }

  function updateGrid() {
    let tempSquareList = [...squareList];
    for (let i = 0; i < tempSquareList.length; i++)
      for (let j = 0; j < tempSquareList.length; j++)
        if (tempSquareList[i][j].head) {
          tempSquareList[i][j].head = false;
          switch (headDirection) {
            case "left":
              tempSquareList[i][j - 1].head = true;
              break;
            case "right":
              tempSquareList[i][j + 1].head = true;
              break;
            case "down":
              tempSquareList[i + 1][j].head = true;
              break;
            case "up":
              tempSquareList[i - 1][j].head = true;
              break;
            default:
              break;
          }
        }
    setSquareList(tempSquareList);
  }

  return (
    <div className="Grid">
      <h1>SNAKE</h1>
      {squareList.map((row, index) => (
        <SnakeRow key={index} row={row} />
      ))}
    </div>
  );
}

export default SnakeGrid;
