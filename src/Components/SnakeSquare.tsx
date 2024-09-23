import React from "react";
import { SnakeSquareType } from "../Types";
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
  headDirection: string;
}

function SnakeSquare({ square, fruitNum, headDirection }: SnakeSquareProps) {
  return (
    <div className="Square">
      {square.fruit && fruitNum === 1 ? <Apple /> : <div></div>}
      {square.fruit && fruitNum === 2 ? <Orange /> : <div></div>}
      {square.fruit && fruitNum === 3 ? <Banana /> : <div></div>}
      {square.head && headDirection === "left" ? <ArrowLeft /> : <div></div>}
      {square.head && headDirection === "right" ? <ArrowRight /> : <div></div>}
      {square.head && headDirection === "up" ? <ArrowUp /> : <div></div>}
      {square.head && headDirection === "down" ? <ArrowDown /> : <div></div>}
      {square.bodyPos > 0 ? <Circle /> : <div></div>}
    </div>
  );
}

export default SnakeSquare;
