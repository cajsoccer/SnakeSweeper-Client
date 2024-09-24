import React from "react";
import { Direction, SnakeSquareType } from "../Types";
import Apple from "../icons/Apple";
import Orange from "../icons/Orange";
import Banana from "../icons/Banana";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";
import Circle from "../icons/Circle";

interface SnakeSquareProps {
  square: SnakeSquareType;
  fruitNum: number;
  headDirection: Direction;
}

function SnakeSquare({ square, fruitNum, headDirection }: SnakeSquareProps) {
  return (
    <div className="SnakeSquare">
      {square.fruit && fruitNum === 1 ? <Apple /> : <div></div>}
      {square.fruit && fruitNum === 2 ? <Orange /> : <div></div>}
      {square.fruit && fruitNum === 3 ? <Banana /> : <div></div>}
      {square.head && headDirection === Direction.Left ? <ArrowLeft /> : <div></div>}
      {square.head && headDirection === Direction.Right ? <ArrowRight /> : <div></div>}
      {square.head && headDirection === Direction.Up ? <ArrowUp /> : <div></div>}
      {square.head && headDirection === Direction.Down ? <ArrowDown /> : <div></div>}
      {square.bodyPos > 0 ? <Circle /> : <div></div>}
    </div>
  );
}

export default SnakeSquare;
