export interface MineSquareType {
  id: number;
  xPos: number;
  yPos: number;
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
