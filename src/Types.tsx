export interface MineSquareType {
  x: number;
  y: number;
  adjacentBombs: number;
  flipped: boolean;
  flagged: boolean;
  bomb: boolean;
  hovered: boolean;
}

export interface SnakeSquareType {
  id: number;
  xPos: number;
  yPos: number;
  head: boolean;
  tail: boolean;
  fruit: boolean;
}
