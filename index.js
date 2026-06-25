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

    
    

    if(board.getBoard()[row][column].getValue() == 0) {
      
      board.specific(row, column, getActivePlayer().token);
      switchPlayerTurn();
      printNewRound();
    }
    const totalZeros = board.getBoard().flat().filter(cell => cell.getValue() === 0).length;

    if (totalZeros <= 4) {
  const currentBoard = board.getBoard();

  for (let i = 0; i < 3; i++) {
    const row = currentBoard[i];
    const column = currentBoard.map(r => r[i]);

    if (row.every(cell => cell.getValue() === 1) || column.every(cell => cell.getValue() === 1)) {
      console.log("playerOneWin");
      return; 
    }
    if (row.every(cell => cell.getValue() === 2) || column.every(cell => cell.getValue() === 2)) {
      console.log("playerTwoWin");
      return;
    }
  }

  const mainDiagonal = currentBoard.map((row, i) => row[i]);
  const antiDiagonal = currentBoard.map((row, i) => row[2 - i]);

  if (mainDiagonal.every(cell => cell.getValue() === 1) || antiDiagonal.every(cell => cell.getValue() === 1)) {
    console.log("playerOneWin");
  }
  if (mainDiagonal.every(cell => cell.getValue() === 2) || antiDiagonal.every(cell => cell.getValue() === 2)) {
    console.log("playerTwoWin");
  }
}
    
  }
  printNewRound();

  return {getActivePlayer, playRound }
}
const playGame = gameControll();
