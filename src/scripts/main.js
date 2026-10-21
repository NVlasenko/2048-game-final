'use strict';

let board;
let score = 0;
let gameOver = false;
const rows = 4;
const columns = 4;
const startButton = document.querySelector('button');
const gameField = document.querySelector('.game-field');
const loseMessage = document.querySelector('.message-lose');
const winMessage = document.querySelector('.message-win');
const startMessage = document.querySelector('.message-start');

window.onload = function() {
  startButton.addEventListener('click', function() {
    setGame();
    startMessage.classList.add('hidden');
    startButton.innerHTML = 'Restart';
  });
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  score = 0;
  gameOver = false;
  document.querySelector('.game-score').innerText = score;

  const gameBody = gameField.querySelector('tbody');

  gameBody.innerHTML = '';
  loseMessage.classList.add('hidden');
  winMessage.classList.add('hidden');

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('tr');

    row.classList.add('field-row');

    for (let c = 0; c < columns; c++) {
      const tile = document.createElement('td');

      tile.classList.add('field-cell');
      tile.id = r.toString() + '-' + c.toString();

      const num = board[r][c];

      updateTile(tile, num);
      row.appendChild(tile);
    }

    gameBody.appendChild(row);
  }
  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        return true;
      }
    }
  }

  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;

  while (!found) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * columns);

    if (board[r][c] === 0) {
      const randomNum = Math.random() < 0.9 ? 2 : 4;

      board[r][c] = randomNum;

      const tile = document.getElementById(r.toString() + '-' + c.toString());

      tile.innerText = randomNum.toString();

      if (randomNum === 2) {
        tile.classList.add('field-cell--2');
      } else {
        tile.classList.add('field-cell--4');
      }
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = '';
  tile.className = 'field-cell';

  if (num > 0) {
    tile.innerText = num;
    tile.classList.add('field-cell--' + num);
  }
}

document.addEventListener('keydown', (e) => {
  if (!board || gameOver) {
    return;
  }

  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
    e.preventDefault();
  }

  const previousBoard = JSON.stringify(board);

  if (e.code === 'ArrowLeft') {
    slideLeft();
  } else if (e.code === 'ArrowRight') {
    slideRight();
  } else if (e.code === 'ArrowUp') {
    slideUp();
  } else if (e.code === 'ArrowDown') {
    slideDown();
  } else {
    return;
  }

  const currentBoard = JSON.stringify(board);

  if (previousBoard !== currentBoard) {
    setTwo();
  }

  document.querySelector('.game-score').innerText = score;

  checkGameOver();
});

function filterZero(row) {
  return row.filter(num => num !== 0);
}

function slide(row) {
  let filteredRow = filterZero(row);

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2;
      filteredRow[i + 1] = 0;
      score += filteredRow[i];
    }
  }

  filteredRow = filterZero(filteredRow);

  while (filteredRow.length < columns) {
    filteredRow.push(0);
  }

  return filteredRow;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = [...board[r]];

    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      const tile = document.getElementById(r.toString() + '-' + c.toString());
      const num = board[r][c];

      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = [...board[r]];

    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      const tile = document.getElementById(r.toString() + '-' + c.toString());
      const num = board[r][c];

      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      const tile = document.getElementById(r.toString() + '-' + c.toString());
      const num = board[r][c];

      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      const tile = document.getElementById(r.toString() + '-' + c.toString());
      const num = board[r][c];

      updateTile(tile, num);
    }
  }
}

function hasMovesLeft() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const currentNum = board[r][c];
      const leftNum = c > 0 ? board[r][c - 1] : null;
      const rightNum = c < columns - 1 ? board[r][c + 1] : null;
      const upNum = r > 0 ? board[r - 1][c] : null;
      const downNum = r < rows - 1 ? board[r + 1][c] : null;

      if (
        currentNum === 0
        || currentNum === leftNum
        || currentNum === rightNum
        || currentNum === upNum
        || currentNum === downNum
      ) {
        return true;
      }
    }
  }

  return false;
}

function checkGameOver() {
  const hasWon = board.some(row => row.some(num => num >= 2048));

  if (hasWon) {
    winMessage.classList.remove('hidden');
    gameOver = true;

    return;
  }

  if (!hasEmptyTile() && !hasMovesLeft()) {
    loseMessage.classList.remove('hidden');
    gameOver = true;
  }
}
