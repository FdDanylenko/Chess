import { forEachChild } from "typescript";
import { Board } from "./Board";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Player } from "./Player";
import { King } from "./pieces/King";

// Функція пошуку ботом найкращих ходів
export function bot(
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  console.log("Trying to retreat");
  let retreat = findMove(4, board, currentPlayer);
  if (retreat) return retreat;

  console.log("Trying to make a good move");
  let goodMove = findMove(1, board, currentPlayer);
  if (goodMove) return goodMove;

  console.log("Trying to protect hanging piece");
  let hangingPiece = findMove(1, board, currentPlayer);
  if (hangingPiece) return hangingPiece;

  console.log("Trying to make a normal move");
  let normalMove = findMove(2, board, currentPlayer);
  if (normalMove) return normalMove;

  console.log("Trying to make a move");
  let anyMove = findMove(3, board, currentPlayer);
  if (anyMove) return anyMove;
  return null;
}

// Функція що повертає клітинки з фігурами кольору гравця
function getBotCells(board: Board, playerColor: Colors) {
  let botCells: Cell[] = [];
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < board.cells[i].length; j++) {
      if (board.getCell(i, j).piece?.color === playerColor) {
        botCells.push(board.getCell(i, j));
      }
    }
  }
  return botCells;
}

// Функція що повертає пусті клітинки та клітинки з фігурами кольору противника
function getCellsToMoveForBot(board: Board, playerColor: Colors) {
  let cellsToMoveForBot: Cell[] = [];
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < board.cells[i].length; j++) {
      if (
        (board.getCell(i, j).piece?.color !== playerColor ||
          board.getCell(i, j).isEmpty()) &&
        i < 8 &&
        j < 8
      ) {
        cellsToMoveForBot.push(board.getCell(i, j));
      }
    }
  }
  return cellsToMoveForBot;
}

// Функція що виконує пошук ходів
function findMove(
  index: number,
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  let botCells: Cell[] = getBotCells(board, currentPlayer.color);
  let moveMade = false;
  let move: any;
  do {
    let randomCell: Cell =
      botCells[Math.floor(Math.random() * botCells.length)];
    if (randomCell && randomCell.piece?.canPieceMove()) {
      if (index === 1)
        move = tryToMakeGoodMove(randomCell, board, currentPlayer);
      if (index === 2)
        move = tryToMakeNormalMove(randomCell, board, currentPlayer);
      if (index === 3)
        move = tryToMakeAnyMove(randomCell, board, currentPlayer);
      if (index === 4)
        move = tryToRetreatToSafety(randomCell, board, currentPlayer);
      // if (index === 5)
      //   move = tryToProtectHangingPiece(randomCell, board, currentPlayer);
      if (move) {
        moveMade = true;
      } else {
        let elementToRemove = randomCell;
        botCells = botCells.filter((cell) => cell !== elementToRemove);
      }
    } else {
      let elementToRemove = randomCell;
      botCells = botCells.filter((cell) => cell !== elementToRemove);
    }
  } while (botCells.length > 0 && !moveMade);
  if (moveMade) {
    return move;
  }
  return null;
}

// Функція пошуку ходів для захисту незахищених фігур
// function tryToProtectHangingPiece(
//   currentCell: Cell,
//   board: Board,
//   currentPlayer: Player
// ): { cell: Cell; cellToMove: Cell } | null {
//   const botCells: Cell[] = getBotCells(board, currentPlayer.color).filter(
//     (cell) => cell !== currentCell
//   );
//   const cellsWithEnemyPieces = getCellsToMoveForBot(
//     board,
//     currentPlayer.color
//   ).filter((cell) => cell.piece && cell.piece.color !== currentPlayer.color);

//   for (let i = 1; i < cellsWithEnemyPieces.length; i++) {
//     const enemyPiece = cellsWithEnemyPieces[i].piece;
//     if (
//       enemyPiece &&
//       currentCell.piece &&
//       enemyPiece.canMove(currentCell) &&
//       (!currentCell.piece.canMove(enemyPiece.cell) ||
//         (enemyPiece.strength <= currentCell.piece.strength &&
//           enemyPiece.isProtected())) &&
//       !currentCell.piece.isProtected()
//     ) {
//       const result = botCells.find(
//         (cell) => cell.piece && cell.piece.canMoveForProtection(currentCell)
//       );
//       board.cells.flat().filter(cell => cell.piece?.canMove(currentCell))
//       if (result) return { cell: currentCell, cellToMove: result };
//     }
//   }
//   return null;
// }

// Функція пошуку шляхів відступу для більш важливих фігур
function tryToRetreatToSafety(
  currentCell: Cell,
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  const cellsWithEnemyPieces = getCellsToMoveForBot(
    board,
    currentPlayer.color
  ).filter((cell) => cell.piece && cell.piece.color !== currentPlayer.color);
  for (let i = 1; i < cellsWithEnemyPieces.length; i++) {
    const enemyPiece = cellsWithEnemyPieces[i].piece;
    if (
      enemyPiece &&
      currentCell.piece &&
      enemyPiece.strength < currentCell.piece?.strength &&
      enemyPiece.canMove(currentCell) &&
      (!currentCell.piece.canMove(enemyPiece.cell) || enemyPiece.isProtected())
    ) {
      const result = board.cells
        .flat()
        .find(
          (cell) =>
            !enemyPiece.canMove(cell) &&
            currentCell.piece &&
            currentCell.piece.canMove(cell)
        );
      if (result) return { cell: currentCell, cellToMove: result };
    }
  }
  return null;
}

// Функція пошуку можливості взяття більш вартісної фігури
function tryToMakeGoodMove(
  currentCell: Cell,
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  const cellsToMove = getCellsToMoveForBot(board, currentPlayer.color);
  const cellToMove = cellsToMove.find(
    (cell) =>
      cell.piece &&
      currentCell.piece?.canMove(board.getCell(cell.x, cell.y)) === true &&
      cell.piece?.strength > currentCell.piece?.strength
  );
  if (cellToMove) return { cell: currentCell, cellToMove: cellToMove };
  return null;
}

// Функція пошуку можливості взяття рівної за вартістю фігури
function tryToMakeNormalMove(
  currentCell: Cell,
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  const cellsToMove = getCellsToMoveForBot(board, currentPlayer.color);
  const cellToMove = cellsToMove.find(
    (cell) =>
      cell.piece &&
      currentCell.piece?.canMove(board.getCell(cell.x, cell.y)) === true &&
      cell.piece?.strength == currentCell.piece?.strength &&
      !cell.piece.isProtected()
  );
  if (cellToMove) return { cell: currentCell, cellToMove: cellToMove };
  return null;
}

// Функція пошуку можливості виконати будь-який хід
function tryToMakeAnyMove(
  currentCell: Cell,
  board: Board,
  currentPlayer: Player
): { cell: Cell; cellToMove: Cell } | null {
  const cellsToMove = getCellsToMoveForBot(board, currentPlayer.color);
  const cellToMove = cellsToMove.find((cell) => {
    return currentCell.piece?.canMove(board.getCell(cell.x, cell.y)) === true;
  });
  if (cellToMove) {
    return { cell: currentCell, cellToMove: cellToMove };
  }
  return null;
}
