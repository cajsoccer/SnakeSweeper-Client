import React from "react";
import Square from "./Square";
import { SquareType } from "../Types";

interface RowProps {
  row: SquareType[];
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
  hover: (x: number) => void;
}

function Row({ row, leftClick, rightClick, hover }: RowProps) {
  return (
    <span className="Row">
      {row.map((square, index) => (
        <Square
          key={index}
          square={square}
          leftClick={leftClick}
          rightClick={rightClick}
          hover={hover}
        />
      ))}
    </span>
  );
}

export default Row;
