import React from "react";
import { MineSquareType } from "../Types";
import Bomb from "../icons/Bomb";
import Flag from "../icons/Flag";

interface MineSquareProps {
  square: MineSquareType;
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
}

function MineSquare({ square, leftClick, rightClick }: MineSquareProps) {
  return (
    <div
      onClick={() => leftClick(square.id)}
      onContextMenu={(event) => {
        event.preventDefault();
        rightClick(square.id);
      }}
      className={
        (square.flipped ? "Flipped" : "Square") +
        (square.adjacentBombs === 1 ? " OneClose" : "") +
        (square.adjacentBombs === 2 ? " TwoClose" : "") +
        (square.adjacentBombs > 2 ? " ThreePlusClose" : "")
      }
    >
      {!square.flipped && square.flagged && <Flag />}
      {square.bomb && <Bomb />}
      {!square.bomb &&
        square.adjacentBombs > 0 &&
        square.adjacentBombs.toString()}
      {!square.bomb && square.adjacentBombs === 0 && "/"}
    </div>
  );
}

export default MineSquare;
