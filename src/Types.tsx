export interface SquareType {
  id: number;
  xPos: number;
  yPos: number;
  adjacentBombs: number;
  flipped: boolean;
  flagged: boolean;
  bomb: boolean;
}
