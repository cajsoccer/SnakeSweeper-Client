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
  x: number;
  y: number;
  bodyPos: number;
  head: boolean;
  fruit: boolean;
}
