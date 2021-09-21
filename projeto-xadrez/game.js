const PieceColors = {
    BLACK: 'Black',
    WHITE: 'White'
};

class Piece {
    constructor(name, symbol, color) {
        this._name = name;
        this._color = color;
        this._symbol = symbol;
        this._x = 0;
        this._y = 0;
        this._hasMoved = false;
    }

    validMoves() {
        return [];
    }

    validAttacks() {
        return [];
    }

    canMove(x, y) {
        return this.validMoves().some((move) => move.x == x && move.y == y);
    }

    canAttack(x, y) {
        return this.validAttacks().some((attack) => attack.x == x && attack.y == y);
    }

    move(x, y) {
        if (this.canMove()) {
            this._hasMoved = true;

            this.setPosition(x, y);
        }
    }

    attack(x, y) {
        if (this.canAttack(x, y)) {

            this.setPosition(x, y);
        }
    }

    setPosition(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7) return false;

        this._x = x;
        this._y = y;

        return true;
    }

    get name() {
        return `${this._color} ${this._name}`;
    }

    get symbol() {
        return this._symbol;
    }

    get position() {
        return `(${this._x}, ${this._y})`;
    }

    get positionName() {
        return `${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][this._x]}${this._y + 1}`;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get color() {
        return this._color;
    }
}

class Pawn extends Piece {
    constructor(color) {
        super('Pawn', '&#9823', color);
    }

    validMoves() {
        return [];
    }
}

class King extends Piece {
    constructor(color) {
        super('King', '&#9818', color);
    }

    validMoves() {
        return [];
    }
}

class Queen extends Piece {
    constructor(color) {
        super('Queen', '&#9819', color);
    }

    validMoves() {
        return [];
    }
}

class Horse extends Piece {
    constructor(color) {
        super('Horse', '&#9822', color);
    }

    validMoves() {
        return [];
    }
}

class Rook extends Piece {
    constructor(color) {
        super('Rook', '&#9820', color);
    }

    validMoves() {
        return [];
    }
}

class Bishop extends Piece {
    constructor(color) {
        super('Bishop', '&#9821', color);
    }

    validMoves() {
        return [];
    }
}


class ChessBoard {
    constructor() {
        this._pieces = [];
    }

    initialize() {
        // Kings
        const whiteKing = new King(PieceColors.WHITE);
        const blackKing = new King(PieceColors.BLACK);

        whiteKing.setPosition(4, 0);
        blackKing.setPosition(4, 7);

        this._pieces.push(whiteKing, blackKing);

        // Queens
        const whiteQueen = new Queen(PieceColors.WHITE);
        const blackQueen = new Queen(PieceColors.BLACK);

        whiteQueen.setPosition(3, 0);
        blackQueen.setPosition(3, 7);

        this._pieces.push(whiteQueen, blackQueen);

        // Rooks
        const whiteRookQ = new Rook(PieceColors.WHITE);
        const whiteRookK = new Rook(PieceColors.WHITE);
        const blackRookQ = new Rook(PieceColors.BLACK);
        const blackRookK = new Rook(PieceColors.BLACK);

        whiteRookQ.setPosition(0, 0);
        whiteRookK.setPosition(7, 0);
        blackRookQ.setPosition(0, 7);
        blackRookK.setPosition(7, 7);

        this._pieces.push(whiteRookQ, whiteRookK, blackRookQ, blackRookK);

        // Bishop
        const whiteBishopQ = new Bishop(PieceColors.WHITE);
        const whiteBishopK = new Bishop(PieceColors.WHITE);
        const blackBishopQ = new Bishop(PieceColors.BLACK);
        const blackBishopK = new Bishop(PieceColors.BLACK);

        whiteBishopQ.setPosition(2, 0);
        whiteBishopK.setPosition(5, 0);
        blackBishopQ.setPosition(2, 7);
        blackBishopK.setPosition(5, 7);

        this._pieces.push(whiteBishopQ, whiteBishopK, blackBishopQ, blackBishopK);

        // Horse
        const whiteHorseQ = new Horse(PieceColors.WHITE);
        const whiteHorseK = new Horse(PieceColors.WHITE);
        const blackHorseQ = new Horse(PieceColors.BLACK);
        const blackHorseK = new Horse(PieceColors.BLACK);

        whiteHorseQ.setPosition(1, 0);
        whiteHorseK.setPosition(6, 0);
        blackHorseQ.setPosition(1, 7);
        blackHorseK.setPosition(6, 7);

        this._pieces.push(whiteHorseQ, whiteHorseK, blackHorseQ, blackHorseK);
        
        // Pawns
        for (let x = 0; x < 8; x += 1) {
            const whitePawn = new Pawn(PieceColors.WHITE);
            const blackPawn = new Pawn(PieceColors.BLACK);

            whitePawn.setPosition(x, 1);
            blackPawn.setPosition(x, 6);

            this._pieces.push(whitePawn, blackPawn);
        }
    }

    get pieces() {
        return this._pieces;
    }
}
