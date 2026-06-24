function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = []
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }
  const specific = (row, column, player) => {
    board[row][column].placePiece(player);
   } 
  
  const getBoard = ()  => board; 

  const printBoard = () => {
    const boardWithValue = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithValue);
  };
  return {getBoard, specific, printBoard} 
}


function cell() {
  let value = 0;
  
  const placePiece = (player) => {
    value = player;
  }
  const getValue = () => value;
  return {placePiece, getValue}
}

function gameControll(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameBoard();
  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];
   const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    board.specific(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  }
  printNewRound();

  return {getActivePlayer, playRound }
}
const playGame = gameControll();
