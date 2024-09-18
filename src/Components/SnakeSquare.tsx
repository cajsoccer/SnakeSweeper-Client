import React from "react";
import { SnakeSquareType } from "../Types";

interface SnakeSquareProps {
  square: SnakeSquareType;
}

function SnakeSquare({ square }: SnakeSquareProps) {
  return <div className={"Square" + (square.head ? " Head" : "")}></div>;
}

export default SnakeSquare;
