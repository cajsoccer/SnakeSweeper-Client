import React from "react";
import { SquareType } from "../Types";
import Bomb from "../icons/Bomb";
import Flag from "../icons/Flag";

interface SquareProps {
  square: SquareType;
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
  test: boolean;
}

function Square({ square, leftClick, rightClick, test }: SquareProps) {
  return (
    <div
      onClick={() => leftClick(square.id)}
      onContextMenu={() => rightClick(square.id)}
      className={
        "Square" +
        (square.flipped || test ? " Flipped" : "") +
        (square.adjacentBombs === 1 ? " OneClose" : "") +
        (square.adjacentBombs === 2 ? " TwoClose" : "") +
        (square.adjacentBombs > 2 ? " ThreePlusClose" : "")
      }
    >
      {!square.flipped && square.flagged && <Flag />}
      {(square.flipped || test) && square.bomb && <Bomb />}
      {(square.flipped || test) &&
        !square.bomb &&
        square.adjacentBombs > 0 &&
        square.adjacentBombs.toString()}
      {(square.flipped || test) &&
        !square.bomb &&
        square.adjacentBombs === 0 &&
        "/"}
    </div>
  );
}

export default Square;
