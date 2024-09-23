import React from "react";
import { SnakeSquareType } from "../Types";

interface SnakeSquareProps {
  square: SnakeSquareType;
}

function SnakeSquare({ square }: SnakeSquareProps) {
  return (
    <div
      className={
        "Square" +
        (square.head ? " Head" : "") +
        (square.bodyPos > 0 ? " Body" : "") +
        (square.fruit ? " Fruit" : "")
      }
    ></div>
  );
}

export default SnakeSquare;
