import React from "react";
import SnakeSquare from "./SnakeSquare";
import { SnakeSquareType } from "../Types";

interface SnakeRowProps {
  row: SnakeSquareType[];
}

function SnakeRow({ row }: SnakeRowProps) {
  return (
    <span className="Row">
      {row.map((square, index) => (
        <SnakeSquare key={index} square={square} />
      ))}
    </span>
  );
}

export default SnakeRow;
