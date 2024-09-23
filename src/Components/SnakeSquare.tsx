import React from "react";
import { SnakeSquareType } from "../Types";
import Bomb from "../icons/Bomb";

interface SnakeSquareProps {
  square: SnakeSquareType;
  fruitNum: number;
}

function SnakeSquare({ square, fruitNum }: SnakeSquareProps) {
  return (
    <div
      className={
        "Square" +
        (square.head ? " Head" : "") +
        (square.bodyPos > 0 ? " Body" : "") +
        (square.fruit ? " Fruit" : "")
      }
    >
      {square.fruit && fruitNum === 1 ? <Bomb /> : <div></div>}
    </div>
  );
}

export default SnakeSquare;
