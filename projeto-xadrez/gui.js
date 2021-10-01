const chessBoardEl = document.querySelector('#chessBoard');
const gridLayerEl = document.querySelector('#gridLayer');
const piecesLayerEl = document.querySelector('#piecesLayer');

const chessBoard = new ChessBoard();
let selectedPiece = undefined;

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
  if(piece.color === chessBoard.currentTurn) {

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

function movePiece(piece, targetPosition) {
  const castle = piece instanceof King ? piece.validCastles().find((castle) => castle.position.equals(targetPosition)) : undefined;

  if (piece.move(targetPosition.x, targetPosition.y)) {
    selectedPiece = undefined;

    updatePiece(piece);

    if (castle) {
      updatePiece(castle.rook);
    }

    deselectAllSquares();
    removeMoveHighlights();
    removeAttackHighlights();

    chessBoard.switchTurn();
  }
}

function attackPiece(piece, targetPosition) {
  const targetPiece = chessBoard.getPieceAtPosition(targetPosition.x, targetPosition.y);
  const enpassant = selectedPiece instanceof Pawn ? selectedPiece.validEnpassants().find((enpassant) => enpassant.position.equals(targetPosition)) : undefined;

  if (piece.attack(targetPosition.x, targetPosition.y)) {
    selectedPiece = undefined;
    
    updatePiece(piece);

    if (targetPiece) {
      updatePiece(targetPiece);
    } else {
      if (enpassant) {
        updatePiece(enpassant.pawn);
      }
    }

    deselectAllSquares();
    removeMoveHighlights();
    removeAttackHighlights();

    chessBoard.switchTurn();
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

    const targetPosition = new Position(Math.floor(layerX / squareSize), 7 - Math.floor(layerY / squareSize));

    if (selectedPiece.x != targetPosition.x || selectedPiece.y != targetPosition.y) {
      const isMove = selectedPiece.validMoves().some((position) => position.equals(targetPosition));
      if (isMove) return movePiece(selectedPiece, targetPosition);

      const isAttack = selectedPiece.validAttacks().some((position) => position.equals(targetPosition));
      if (isAttack) return attackPiece(selectedPiece, targetPosition);
    }
  }
}


chessBoardEl.addEventListener('click', onChessBoardClick);

// Game

chessBoard.initialize();

createBoard();
createPieces(chessBoard);

