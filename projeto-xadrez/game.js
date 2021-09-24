const PieceColors = {
    WHITE: {
        name: 'White',
        slug: 'white',
        direction: 1
    },
    BLACK: {
        name: 'Black',
        slug: 'black',
        direction: -1
    }
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
        let validMoves = [
            new Position(this.x + 1, this.y),
            new Position(this.x - 1, this.y),
            new Position(this.x + 1, this.y + 1),
            new Position(this.x - 1, this.y + 1),
            new Position(this.x + 1, this.y - 1),
            new Position(this.x - 1, this.y - 1),
            new Position(this.x, this.y + 1),
            new Position(this.x, this.y - 1)
        ];

        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        // Remove as posições as quais possuem peças
        validMoves = validMoves.filter((position) => !this.chessBoard.getPieceAtPosition(position.x, position.y));
        
        return validMoves;
    }
}

class Queen extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Queen', '&#9819', color);
    }
    
    validMoves() {
        let validMoves = [];

        for (let i = 1; i <= 7; i += 1) {
            validMoves.push(new Position(this.x + i, this.y), 
                new Position(this.x - i, this.y), 
                new Position(this.x, this.y - i), 
                new Position(this.x, this.y + i), 
                new Position(this.x + i, this.y + i), 
                new Position(this.x - i, this.y - i), 
                new Position(this.x + i, this.y - i), 
                new Position(this.x - i, this.y + i));
        }

        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        return validMoves;
    }
}

class Rook extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Rook', '&#9820', color);
    }

    validMoves() {
        let validMoves = [];

        let directions = {
            n: true,
            s: true,
            e: true,
            w: true
        }

        for (let i = 1; i <= 7; i += 1) {
            const positionN = new Position(this.x, this.y - i);
            const positionS = new Position(this.x, this.y + i);
            const positionE = new Position(this.x + i, this.y);
            const positionW = new Position(this.x - i, this.y);

            if (directions.n && this.chessBoard.getPieceAtPosition(positionN.x, positionN.y)) directions.n = false;
            if (directions.s && this.chessBoard.getPieceAtPosition(positionS.x, positionS.y)) directions.s = false;
            if (directions.e && this.chessBoard.getPieceAtPosition(positionE.x, positionE.y)) directions.e = false;
            if (directions.w && this.chessBoard.getPieceAtPosition(positionW.x, positionW.y)) directions.w = false;
            
            if (directions.n) validMoves.push(positionN);
            if (directions.s) validMoves.push(positionS);
            if (directions.e) validMoves.push(positionE);
            if (directions.w) validMoves.push(positionW);
        }

        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        return validMoves;
    }
}

class Bishop extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Bishop', '&#9821', color);
    }

    validMoves() {
        let validMoves = [];

        for (let i = 1; i <= 7; i += 1) {
            validMoves.push(new Position(this.x + i, this.y + i), 
                new Position(this.x - i, this.y - i), 
                new Position(this.x + i, this.y - i), 
                new Position(this.x - i, this.y + i));
        }

        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        return validMoves;
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
        
        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        // Remove as posições as quais possuem peças
        validMoves = validMoves.filter((position) => !this.chessBoard.getPieceAtPosition(position.x, position.y));

        return validMoves;
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

        // Removendo quem tá fora do tabuleiro
        validAttacks = validAttacks.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        // Remove as posições as quais não possuem inimigos
        validAttacks = validAttacks.filter((position) => {
            const targetPiece = this.chessBoard.getPieceAtPosition(position.x, position.y);
            return targetPiece && targetPiece.color !== this.color;
        });
        
        return validAttacks;
    }
}

class Pawn extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Pawn', '&#9823', color);
    }

    validMoves() {
        let validMoves = [
            new Position(this.x, this.y + this._color.direction)    
        ];

        // Passo duplo inicial
        if (!this._hasMoved && !this.chessBoard.getPieceAtPosition(validMoves[0].x, validMoves[0].y)) validMoves.push(new Position(this.x, this.y + (this._color.direction * 2)));
        
        // Removendo quem tá fora do tabuleiro
        validMoves = validMoves.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        // Remove as posições as quais possuem peças
        validMoves = validMoves.filter((position) => !this.chessBoard.getPieceAtPosition(position.x, position.y));

        return validMoves;
    }

    validAttacks() {
        let validAttacks = [
            new Position(this.x - 1, this.y + this._color.direction),
            new Position(this.x + 1, this.y + this._color.direction)
        ];

        // Removendo quem tá fora do tabuleiro
        validAttacks = validAttacks.filter((position) => (position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8));

        // Remove as posições as quais não possuem inimigos
        validAttacks = validAttacks.filter((position) => {
            const targetPiece = this.chessBoard.getPieceAtPosition(position.x, position.y);
            return targetPiece && targetPiece.color !== this.color;
        });
        
        return validAttacks;
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
