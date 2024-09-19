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
        (square.tail ? " Tail" : "") +
        (square.fruit ? " Fruit" : "")
      }
    ></div>
  );
}

export default SnakeSquare;
