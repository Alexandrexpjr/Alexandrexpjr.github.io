class ChessBoard {
    constructor() {
        this._pieces = [];
        this._currentTurn = PieceColors.WHITE;
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

        // Knight
        const whiteKnightQ = new Knight(this, 'wkq', PieceColors.WHITE);
        const whiteKnightK = new Knight(this, 'wkk', PieceColors.WHITE);
        const blackKnightQ = new Knight(this, 'bkq', PieceColors.BLACK);
        const blackKnightK = new Knight(this, 'bkk', PieceColors.BLACK);

        whiteKnightQ.setPosition(1, 0);
        whiteKnightK.setPosition(6, 0);
        blackKnightQ.setPosition(1, 7);
        blackKnightK.setPosition(6, 7);

        this._pieces.push(whiteKnightQ, whiteKnightK, blackKnightQ, blackKnightK);
        
        // Pawns
        for (let i = 1; i <= 8; i += 1) {
            const whitePawn = new Pawn(this, `wp${i}`, PieceColors.WHITE);
            const blackPawn = new Pawn(this, `bp${i}`, PieceColors.BLACK);

            const x = i - 1;

            whitePawn.setPosition(x, 1);
            blackPawn.setPosition(x, 6);

            this._pieces.push(whitePawn, blackPawn);
        }

        // const whitePawn = new Pawn(this, `wp1`, PieceColors.WHITE);
        // whitePawn.setPosition(0, 6);
        // this._pieces.push(whitePawn);
    }

    getPieceAtPosition(x, y) {
        return this.pieces.find((piece) => piece.x === x && piece.y === y);
    }

    switchTurn() {
        this._currentTurn = (this._currentTurn === PieceColors.WHITE) ? PieceColors.BLACK : PieceColors.WHITE;
        
        const enpassantableEnemyPawns = this.pieces.filter((piece) => piece instanceof Pawn && piece.color == this._currentTurn && piece.isEnpassantable);
        enpassantableEnemyPawns.forEach((pawn) => {
            pawn.notEmpassantableAnymore();
        });
    }

    get pieces() {
        return this._pieces.filter((piece) => piece.isAlive);
    }

    get currentTurn() {
        return this._currentTurn;
    }
}