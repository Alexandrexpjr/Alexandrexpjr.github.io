const chessBoardEl = document.querySelector('#chessBoard');
const gridLayerEl = document.querySelector('#gridLayer');
const piecesLayerEl = document.querySelector('#piecesLayer');

function createBoard() {
  for (let i = 0; i < 64; i += 1) {
    const squareEl = document.createElement('div');
    squareEl.classList.add('square');
    gridLayerEl.appendChild(squareEl);
  }
}

function createPiece(piece) {
  const pieceEl = document.createElement('div');
  pieceEl.classList.add((piece.color === PieceColors.WHITE) ? 'white' : 'black');
  pieceEl.classList.add(piece.positionName);
  pieceEl.classList.add('piece');
  pieceEl.innerHTML = piece.symbol;
  piecesLayerEl.appendChild(pieceEl);
}

function createPieces(chessBoard) {
  chessBoard.pieces.forEach(piece => {
    createPiece(piece);
  });
}

const chessBoard = new ChessBoard();
chessBoard.initialize();

createBoard();
createPieces(chessBoard);

