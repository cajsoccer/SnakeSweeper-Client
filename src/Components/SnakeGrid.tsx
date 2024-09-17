import React, { useState } from "react";
import SnakeRow from "./SnakeRow";
import { SnakeSquareType } from "../Types";

function SnakeGrid() {
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
        if (i === 8 && j === 8) tempRow[8].head = true;
      }
      initialSquareList.push(tempRow);
    }
    return initialSquareList;
  }
  const [squareList, setSquareList] = useState(() => getInitGrid(16));
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
