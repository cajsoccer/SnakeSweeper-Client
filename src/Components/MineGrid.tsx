import React, { useState } from "react";
import MineRow from "./MineRow";
import { MineSquareType } from "../Types";
import GameOver from "./GameOver";

function MineGrid() {
  const [firstSquareClicked, setFirstSquareClicked] = useState(false);
  const [squareList, setSquareList] = useState(() => getInitGrid(16));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  let checkedAlreadyList: number[] = [];

  function getInitGrid(size: number) {
    let initialSquareList: MineSquareType[][] = [];
    for (let i = 0; i < size; i++) {
      let tempRow: MineSquareType[] = [];
      for (let j = 0; j < size; j++) {
        tempRow.push({
          id: i * size + j + 1,
          xPos: i,
          yPos: j,
          adjacentBombs: 0,
          flipped: false,
          flagged: false,
          bomb: false,
          hovered: false,
        });
      }
      initialSquareList.push(tempRow);
    }
    for (let i = 0; i < 40; i++) {
      let randX = Math.floor(Math.random() * size);
      let randY = Math.floor(Math.random() * size);
      while (initialSquareList[randX][randY].bomb === true) {
        randX = Math.floor(Math.random() * size);
        randY = Math.floor(Math.random() * size);
      }
      initialSquareList[randX][randY].bomb = true;
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = -1; k <= 1; k++) {
          if (
            i - 1 >= 0 &&
            j + k >= 0 &&
            j + k <= size - 1 &&
            initialSquareList[i - 1][j + k].bomb === true
          ) {
            initialSquareList[i][j].adjacentBombs++;
          }
        }
        for (let k = -1; k <= 1; k++) {
          if (
            k !== 0 &&
            j + k >= 0 &&
            j + k <= size - 1 &&
            initialSquareList[i][j + k].bomb === true
          ) {
            initialSquareList[i][j].adjacentBombs++;
          }
        }
        for (let k = -1; k <= 1; k++) {
          if (
            i + 1 <= size - 1 &&
            j + k >= 0 &&
            j + k <= size - 1 &&
            initialSquareList[i + 1][j + k].bomb === true
          ) {
            initialSquareList[i][j].adjacentBombs++;
          }
        }
      }
    }
    return initialSquareList;
  }

  function flipAdjacentSquares(id: number) {
    let tempList = [...squareList];
    const size = tempList.length;
    for (let i = 0; i < squareList.length; i++) {
      for (let j = 0; j < squareList.length; j++) {
        if (
          tempList[i][j].id === id &&
          tempList[i][j].bomb === false &&
          !checkedAlreadyList.includes(id)
        ) {
          tempList[i][j].flipped = true;
          setSquareList(tempList);
          if (tempList[i][j].adjacentBombs === 0) {
            for (let k = -1; k <= 1; k++) {
              if (i - 1 >= 0 && j + k >= 0 && j + k <= size - 1) {
                checkedAlreadyList.push(id);
                flipAdjacentSquares(tempList[i - 1][j + k].id);
              }
            }
            for (let k = -1; k <= 1; k++) {
              if (k !== 0 && j + k >= 0 && j + k <= size - 1) {
                checkedAlreadyList.push(id);
                flipAdjacentSquares(tempList[i][j + k].id);
              }
            }
            for (let k = -1; k <= 1; k++) {
              if (i + 1 <= size - 1 && j + k >= 0 && j + k <= size - 1) {
                checkedAlreadyList.push(id);
                flipAdjacentSquares(tempList[i + 1][j + k].id);
              }
            }
          }
        }
      }
    }
  }

  function gridLeftClickUpdate(id: number) {
    if (!gameOver) {
      let tempList = [...squareList];
      for (let i = 0; i < tempList.length; i++) {
        for (let j = 0; j < tempList.length; j++) {
          if (tempList[i][j].id === id) {
            if (!firstSquareClicked) {
              while (tempList[i][j].bomb) {
                tempList = getInitGrid(16);
              }
            }
            tempList[i][j].flipped = true;
            if (tempList[i][j].bomb) {
              //const bombSound = new Audio(`./sounds/explosion.mp3`);
              //bombSound.play();
              endGame(false);
            }
            setSquareList(tempList);
            flipAdjacentSquares(id);
            setFirstSquareClicked(true);
            if (getEmptySquareCount() === 0) {
              endGame(true);
            }
          }
        }
      }
    }
  }

  function gridRightClickUpdate(id: number) {
    if (!gameOver) {
      let tempList = [...squareList];
      for (let i = 0; i < squareList.length; i++) {
        for (let j = 0; j < squareList.length; j++) {
          if (tempList[i][j].id === id) {
            tempList[i][j].flagged = !tempList[i][j].flagged;
          }
        }
      }
      setSquareList(tempList);
    }
  }

  function getEmptySquareCount() {
    let count = 0;
    for (let i = 0; i < squareList.length; i++) {
      for (let j = 0; j < squareList.length; j++) {
        if (!squareList[i][j].bomb && !squareList[i][j].flipped) {
          count++;
        }
      }
    }
    return count;
  }

  function endGame(gameWon: boolean) {
    if (gameWon) {
      setGameOver(true);
      setGameWon(true);
    } else {
      setGameOver(true);
    }
  }

  return (
    <div className="Grid">
      <h1>MINESWEEPER</h1>
      {squareList.map((row, index) => (
        <MineRow
          key={index}
          row={row}
          leftClick={gridLeftClickUpdate}
          rightClick={gridRightClickUpdate}
        />
      ))}
      {gameOver ? <GameOver gameWon={gameWon} /> : <div></div>}
    </div>
  );
}

export default MineGrid;
