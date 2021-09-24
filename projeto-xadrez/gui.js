const chessBoardEl = document.querySelector('#chessBoard');
const gridLayerEl = document.querySelector('#gridLayer');
const piecesLayerEl = document.querySelector('#piecesLayer');

const chessBoard = new ChessBoard();
let selectedPiece = undefined;
let currentTurn = PieceColors.WHITE;

function switchTurn() {
  currentTurn = (currentTurn === PieceColors.WHITE) ? PieceColors.BLACK : PieceColors.WHITE;
}

function createBoard() {
  for (let i = 0; i < 64; i += 1) {
    const y = Math.floor(i / 8);
    const x = i - (y * 8);
    const positionName = `${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]}${8 - y}`;

    const squareEl = document.createElement('div');
    squareEl.classList.add('square', positionName);
    gridLayerEl.appendChild(squareEl);
  }
}

function createPiece(piece) {
  const pieceEl = document.createElement('div');
  pieceEl.classList.add('piece', piece.identifier, piece.color.slug, piece.position.name);
  pieceEl.innerHTML = piece.symbol;
  pieceEl.addEventListener('click', onPieceClick(piece));
  piecesLayerEl.appendChild(pieceEl);
}

function updatePiece(piece) {
  const pieceEl = piecesLayerEl.querySelector(`.piece.${piece.identifier}`);
  pieceEl.className = '';
  pieceEl.classList.add('piece', piece.identifier, piece.color.slug, piece.position.name);
  if (piece.isDead) {
    pieceEl.classList.add('dead');
  }

  // dps de um tempo, deleta a peça
}

function createPieces(chessBoard) {
  chessBoard.pieces.forEach(piece => {
    createPiece(piece);
  });
}

function deselectAllSquares() {
  const selectedSquares = gridLayerEl.querySelectorAll('.square.selected');
  selectedSquares.forEach((squareEl) => {
    squareEl.classList.remove('selected');
  });
}

function selectSquare(position) {
  const squareEl = gridLayerEl.querySelector(`.square.${position.name}`);
  squareEl.classList.add('selected');
}

function removeMoveHighlights() {
  const movesSquares = gridLayerEl.querySelectorAll('.square.can-move');
  movesSquares.forEach((squareEl) => {
    squareEl.classList.remove('can-move');
  });
}

function removeAttackHighlights() {
  const attacksSquares = gridLayerEl.querySelectorAll('.square.can-attack');
  attacksSquares.forEach((squareEl) => {
    squareEl.classList.remove('can-attack');
  });
}

function highlightMoves(positions) {
  positions.forEach((position) => {
    const squareEl = gridLayerEl.querySelector(`.square.${position.name}`);
    squareEl.classList.add('can-move');
  });
}

function highlightAttacks(positions) {
  positions.forEach((position) => {
    const squareEl = gridLayerEl.querySelector(`.square.${position.name}`);
    squareEl.classList.add('can-attack');
  });
}

function selectPiece(piece) {
  if(piece.color === currentTurn) {

    selectedPiece = piece;
  
    deselectAllSquares();
  
    removeMoveHighlights();
    removeAttackHighlights();
  
    const validMoves = selectedPiece.validMoves();
    highlightMoves(validMoves);
  
    const validAttacks = selectedPiece.validAttacks();
    highlightAttacks(validAttacks);
  
    selectSquare(selectedPiece.position);
  }
}

function movePiece(piece, x, y) {
  if (piece.move(x, y)) {
    selectedPiece = undefined;

    updatePiece(piece);

    deselectAllSquares();
    removeMoveHighlights();
    removeAttackHighlights();
    switchTurn();
  }
}

function attackPiece(piece, targetPiece) {
  if (piece.attack(targetPiece)) {
    selectedPiece = undefined;

    updatePiece(piece);
    updatePiece(targetPiece);

    deselectAllSquares();
    removeMoveHighlights();
    removeAttackHighlights();
    switchTurn();
  }
}

function onPieceClick(piece) {
  return (event) => {
    selectPiece(piece);
  };
}

function onChessBoardClick(event) {
  // Só chama o movimento se o alvo for diferente dele meixmo 
  if (selectedPiece) {
    const squareSize = chessBoardEl.offsetWidth / 8;

    let layerX = event.offsetX || event.layerX;
    let layerY = event.offsetY || event.layerY;

    if (event.target.classList.contains('piece')) {
      layerX += event.target.offsetLeft;
      layerY += event.target.offsetTop;
    }

    const x = Math.floor(layerX / squareSize);
    const y = 7 - Math.floor(layerY / squareSize);

    if (selectedPiece.x != x || selectedPiece.y != y) {
      const targetPiece = chessBoard.getPieceAtPosition(x, y);

      if (targetPiece) {
        attackPiece(selectedPiece, targetPiece);
      } else {
        movePiece(selectedPiece, x, y);
      }
    }
  }
}


chessBoardEl.addEventListener('click', onChessBoardClick);

// Game

chessBoard.initialize();

createBoard();
createPieces(chessBoard);

