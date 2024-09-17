import React from "react";
import MineSquare from "./MineSquare";
import { MineSquareType } from "../Types";

interface MineRowProps {
  row: MineSquareType[];
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
  hover: (x: number) => void;
}

function MineRow({ row, leftClick, rightClick, hover }: MineRowProps) {
  return (
    <span className="Row">
      {row.map((square, index) => (
        <MineSquare
          key={index}
          square={square}
          leftClick={leftClick}
          rightClick={rightClick}
          hover={hover}
        />
      ))}
    </span>
  );
}

export default MineRow;
