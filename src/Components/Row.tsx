import React from "react";
import Square from "./Square";
import { SquareType } from "../Types";

interface SquareProps {
  row: SquareType[];
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
  test: boolean;
}

function Row({ row, leftClick, rightClick, test }: SquareProps) {
  return (
    <span className="Row">
      {row.map((square, index) => (
        <Square
          test={test}
          key={index}
          square={square}
          leftClick={leftClick}
          rightClick={rightClick}
        />
      ))}
    </span>
  );
}

export default Row;
