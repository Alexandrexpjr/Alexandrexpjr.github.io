const PieceColors = {
    WHITE: {
        name: 'White',
        slug: 'white'
    },
    BLACK: {
        name: 'Black',
        slug: 'black'
    }
};

const Directions = {
    N: { x: 0, y: 1 },
    NE: { x: 1, y: 1 },
    E: { x: 1, y: 0 },
    SE: { x: 1, y: -1 },
    S: { x: 0, y: -1 },
    SW: { x: -1, y: -1 },
    W: { x: -1, y: 0 },
    NW: { x: -1, y: 1 }
};

class Position {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    toString() {
        return `(${this._x}, ${this._y})`;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get name() {
        return `${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][this._x]}${this._y + 1}`;
    }
}

class Piece {
    constructor(chessBoard, identifier, name, symbol, color) {
        this._chessBoard = chessBoard;
        this._identifier = identifier;
        this._name = name;
        this._color = color;
        this._symbol = symbol;
        this._position = new Position(0, 0);
        this._hasMoved = false;
        this._isDead = false;
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
        if (this.isAlive && this.canMove(x, y)) {
            this._hasMoved = true;

            this.setPosition(x, y);

            return true;
        }

        return false;
    }

    attack(targetPiece) {
        if (this.isAlive && this.canAttack(targetPiece.x, targetPiece.y)) {
            targetPiece.kill();

            this.setPosition(targetPiece.x, targetPiece.y);

            return true;
        }

        return false;
    }

    kill() {
        this._isDead = true;
    }

    setPosition(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7) return false;

        this.position._x = x;
        this.position._y = y;

        return true;
    }

    raycast(direction, amount, counter = 1, result = []) {
        if (counter > amount) return result;

        const nextPosition = new Position(this.x + (direction.x * counter), this.y + (direction.y * counter));
        
        if (nextPosition.x < 0 || nextPosition.x > 7 || nextPosition.y < 0 || nextPosition.y > 7) return result;

        const pieceFound = this.chessBoard.getPieceAtPosition(nextPosition.x, nextPosition.y);

        if (pieceFound) {
            result.push(pieceFound);
            return result;
        }

        result.push(nextPosition);

        counter += 1;
        
        return this.raycast(direction, amount, counter, result);
    }

    get chessBoard() {
        return this._chessBoard;
    }

    get identifier() {
        return this._identifier;
    }

    get name() {
        return `${this._color.name} ${this._name}`;
    }

    get symbol() {
        return this._symbol;
    }

    get position() {
        return this._position;
    }

    get x() {
        return this._position.x;
    }

    get y() {
        return this._position.y;
    }

    get color() {
        return this._color;
    }

    get isDead() {
        return this._isDead;
    }

    get isAlive() {
        return !this._isDead;
    }
}

class King extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'King', '&#9818', color);
    }

    validMoves() {
        let raycasts = [
            ...this.raycast(Directions.N, 1),
            ...this.raycast(Directions.NE, 1),
            ...this.raycast(Directions.E, 1),
            ...this.raycast(Directions.SE, 1),
            ...this.raycast(Directions.S, 1),
            ...this.raycast(Directions.SW, 1),
            ...this.raycast(Directions.W, 1),
            ...this.raycast(Directions.NW, 1)
        ];

        return raycasts
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let raycasts = [
            ...this.raycast(Directions.N, 1),
            ...this.raycast(Directions.NE, 1),
            ...this.raycast(Directions.E, 1),
            ...this.raycast(Directions.SE, 1),
            ...this.raycast(Directions.S, 1),
            ...this.raycast(Directions.SW, 1),
            ...this.raycast(Directions.W, 1),
            ...this.raycast(Directions.NW, 1)
        ];

        return raycasts
            .filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }
}

class Queen extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Queen', '&#9819', color);
    }
    
    validMoves() {
        let raycasts = [
            ...this.raycast(Directions.N, 7),
            ...this.raycast(Directions.NE, 7),
            ...this.raycast(Directions.E, 7),
            ...this.raycast(Directions.SE, 7),
            ...this.raycast(Directions.S, 7),
            ...this.raycast(Directions.SW, 7),
            ...this.raycast(Directions.W, 7),
            ...this.raycast(Directions.NW, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let raycasts = [
            ...this.raycast(Directions.N, 7),
            ...this.raycast(Directions.NE, 7),
            ...this.raycast(Directions.E, 7),
            ...this.raycast(Directions.SE, 7),
            ...this.raycast(Directions.S, 7),
            ...this.raycast(Directions.SW, 7),
            ...this.raycast(Directions.W, 7),
            ...this.raycast(Directions.NW, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }
}

class Rook extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Rook', '&#9820', color);
    }

    validMoves() {
        let raycasts = [
            ...this.raycast(Directions.N, 7),
            ...this.raycast(Directions.E, 7),
            ...this.raycast(Directions.S, 7),
            ...this.raycast(Directions.W, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let raycasts = [
            ...this.raycast(Directions.N, 7),
            ...this.raycast(Directions.E, 7),
            ...this.raycast(Directions.S, 7),
            ...this.raycast(Directions.W, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }
}

class Bishop extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Bishop', '&#9821', color);
    }

    validMoves() {
        let raycasts = [
            ...this.raycast(Directions.NE, 7),
            ...this.raycast(Directions.SE, 7),
            ...this.raycast(Directions.SW, 7),
            ...this.raycast(Directions.NW, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let raycasts = [
            ...this.raycast(Directions.NE, 7),
            ...this.raycast(Directions.SE, 7),
            ...this.raycast(Directions.SW, 7),
            ...this.raycast(Directions.NW, 7)
        ];

        return raycasts
            .filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }
}

class Horse extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Horse', '&#9822', color);
    }

    validMoves() {
        let validMoves = [
            new Position(this.x - 2, this.y + 1),
            new Position(this.x - 1, this.y + 2),
            new Position(this.x + 1, this.y + 2),
            new Position(this.x + 2, this.y + 1),
            new Position(this.x + 2, this.y - 1),
            new Position(this.x + 1, this.y - 2),
            new Position(this.x - 1, this.y - 2),
            new Position(this.x - 2, this.y - 1)
        ];
        
        return validMoves
            // Remove posições inválidas
            .filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8))
            // Ignora peças que possuem posições
            .filter((position) => !this.chessBoard.getPieceAtPosition(position.x, position.y));
    }

    validAttacks() {
        let validAttacks = [
            new Position(this.x - 2, this.y + 1),
            new Position(this.x - 1, this.y + 2),
            new Position(this.x + 1, this.y + 2),
            new Position(this.x + 2, this.y + 1),
            new Position(this.x + 2, this.y - 1),
            new Position(this.x + 1, this.y - 2),
            new Position(this.x - 1, this.y - 2),
            new Position(this.x - 2, this.y - 1)
        ];
        
        return validAttacks
            // Remove posições inválidas
            .filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8))
            // Seleciona apenas peças inimigas
            .filter((position) => {
                const targetPiece = this.chessBoard.getPieceAtPosition(position.x, position.y);
                return targetPiece && targetPiece.color !== this.color;
            });
    }
}

class Pawn extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Pawn', '&#9823', color);
    }

    validMoves() {
        const moveAmount = this._hasMoved ? 1 : 2;
        const direction = this._color === PieceColors.WHITE ? Directions.N : Directions.S;

        let raycast = this.raycast(direction, moveAmount);

        return raycast
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        const eastDirection = this._color === PieceColors.WHITE ? Directions.NE : Directions.SE;
        const westDirection = this._color === PieceColors.WHITE ? Directions.NW : Directions.SW;

        let raycasts = [
            ...this.raycast(eastDirection, 1),
            ...this.raycast(westDirection, 1)
        ];

        return raycasts
            .filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }
}


class ChessBoard {
    constructor() {
        this._pieces = [];
    }

    initialize() {
        // Kings
        const whiteKing = new King(this, 'wk', PieceColors.WHITE);
        const blackKing = new King(this, 'bk', PieceColors.BLACK);

        whiteKing.setPosition(4, 0);
        blackKing.setPosition(4, 7);

        this._pieces.push(whiteKing, blackKing);

        // Queens
        const whiteQueen = new Queen(this, 'wq', PieceColors.WHITE);
        const blackQueen = new Queen(this, 'bq', PieceColors.BLACK);

        whiteQueen.setPosition(3, 0);
        blackQueen.setPosition(3, 7);

        this._pieces.push(whiteQueen, blackQueen);

        // Rooks
        const whiteRookQ = new Rook(this, 'wrq', PieceColors.WHITE);
        const whiteRookK = new Rook(this, 'wrk', PieceColors.WHITE);
        const blackRookQ = new Rook(this, 'brq', PieceColors.BLACK);
        const blackRookK = new Rook(this, 'brk', PieceColors.BLACK);

        whiteRookQ.setPosition(0, 0);
        whiteRookK.setPosition(7, 0);
        blackRookQ.setPosition(0, 7);
        blackRookK.setPosition(7, 7);

        this._pieces.push(whiteRookQ, whiteRookK, blackRookQ, blackRookK);

        // Bishop
        const whiteBishopQ = new Bishop(this, 'wbq', PieceColors.WHITE);
        const whiteBishopK = new Bishop(this, 'wbk', PieceColors.WHITE);
        const blackBishopQ = new Bishop(this, 'bbq', PieceColors.BLACK);
        const blackBishopK = new Bishop(this, 'bbk', PieceColors.BLACK);

        whiteBishopQ.setPosition(2, 0);
        whiteBishopK.setPosition(5, 0);
        blackBishopQ.setPosition(2, 7);
        blackBishopK.setPosition(5, 7);

        this._pieces.push(whiteBishopQ, whiteBishopK, blackBishopQ, blackBishopK);

        // Horse
        const whiteHorseQ = new Horse(this, 'whq', PieceColors.WHITE);
        const whiteHorseK = new Horse(this, 'whk', PieceColors.WHITE);
        const blackHorseQ = new Horse(this, 'bhq', PieceColors.BLACK);
        const blackHorseK = new Horse(this, 'bhk', PieceColors.BLACK);

        whiteHorseQ.setPosition(1, 0);
        whiteHorseK.setPosition(6, 0);
        blackHorseQ.setPosition(1, 7);
        blackHorseK.setPosition(6, 7);

        this._pieces.push(whiteHorseQ, whiteHorseK, blackHorseQ, blackHorseK);
        
        // Pawns
        for (let i = 1; i <= 8; i += 1) {
            const whitePawn = new Pawn(this, `wp${i}`, PieceColors.WHITE);
            const blackPawn = new Pawn(this, `bp${i}`, PieceColors.BLACK);

            const x = i - 1;

            whitePawn.setPosition(x, 1);
            blackPawn.setPosition(x, 6);

            this._pieces.push(whitePawn, blackPawn);
        }
    }

    getPieceAtPosition(x, y) {
        return this.pieces.find((piece) => piece.x === x && piece.y === y);
    }

    get pieces() {
        return this._pieces.filter((piece) => piece.isAlive);
    }
}
