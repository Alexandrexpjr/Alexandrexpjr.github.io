class Pawn extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Pawn', '&#9823', color);
        this._isEnpassantable = false;
        this._promotedPiece = undefined;
    }

    validMoves() {
        const moveAmount = this._hasMoved ? 1 : 2;
        const direction = this._color === PieceColors.WHITE ? Directions.N : Directions.S;

        let raycast = this.raycast(direction, moveAmount);

        return raycast
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let validAttacks = [];

        const eastDirection = this._color === PieceColors.WHITE ? Directions.NE : Directions.SE;
        const westDirection = this._color === PieceColors.WHITE ? Directions.NW : Directions.SW;

        let raycasts = [
            ...this.raycast(eastDirection, 1),
            ...this.raycast(westDirection, 1)
        ];

        // Standard attacks
        validAttacks = raycasts.filter((move) => move instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);

        // Enpassants
        this.validEnpassants().forEach((enpassant) => {
            validAttacks.push(enpassant.position);
        });
        
        return validAttacks;
    }

    validEnpassants() {
        let validEnpassants = [];

        const sidePawns = [
            ...this.raycast(Directions.E, 1),
            ...this.raycast(Directions.W, 1)
        ];
        const enpassantableEnemyPawns = sidePawns.filter((move) => move instanceof Pawn && move._color !== this._color && move.isEnpassantable);
        
        enpassantableEnemyPawns.forEach((pawn) => {
            const behindStep = pawn.color === PieceColors.WHITE ? Directions.S : Directions.N;
            validEnpassants.push({
                pawn: pawn,
                position: new Position(pawn.x, pawn.y + behindStep.y)
            });
        });

        return validEnpassants;
    }

    canPromoteAtPosition(x, y) {
        const promotionRow = this._color === PieceColors.WHITE ? 7 : 0;
        
        return y === promotionRow;
    }
    
    notEmpassantableAnymore() {
        this._isEnpassantable = false;
    }

    promote(pieceType) {
        const pawnNumber = this._identifier.slice(-1);
        let piece = undefined;

        switch (pieceType) {
            case Bishop: piece = new Bishop(this._chessBoard, `wb${pawnNumber}`, this._color); break;
            case Rook: piece = new Rook(this._chessBoard, `wr${pawnNumber}`, this._color); break;
            case Horse: piece = new Horse(this._chessBoard, `wk${pawnNumber}`, this._color); break;
            default: piece = new Queen(this._chessBoard, `wq${pawnNumber}`, this._color);
        }

        piece.setPosition(this.x, this.y);

        this._chessBoard._pieces.splice(this._chessBoard._pieces.indexOf(this), 1, piece);

        this._promotedPiece = piece;

        return true;
    }
    
    onBeforeMove(oldPosition, newPosition, options) {
        if (!this._hasMoved && Math.abs(oldPosition.y - newPosition.y) === 2) {
            this._isEnpassantable = true;
        }
    }

    onMove(oldPosition, newPosition, options) {
        if (this.canPromoteAtPosition(newPosition.x, newPosition.y)) {
            if (!options.promotion) return false;
    
            this.setPosition(newPosition.x, newPosition.y);
            this._hasMoved = true;

            switch(options.promotion) {
                case 'bishop': this.promote(Bishop); break;
                case 'rook': this.promote(Rook); break;
                case 'horse': this.promote(Horse); break;
                default: this.promote(Queen);
            }
            return true;
        }

        this.setPosition(newPosition.x, newPosition.y);
        this._hasMoved = true;
        return true;
    }

    onAttack(targetPosition, options) {
        const targetPiece = this._chessBoard.getPieceAtPosition(targetPosition.x, targetPosition.y);
        if (targetPiece && targetPiece.isAlive) {
            if (this.canPromoteAtPosition(targetPosition.x, targetPosition.y)) {
                if (!options.promotion) return false;

                targetPiece.kill();
                this.setPosition(targetPiece.x, targetPiece.y);

                switch(options.promotion) {
                    case 'bishop': this.promote(Bishop); break;
                    case 'rook': this.promote(Rook); break;
                    case 'horse': this.promote(Horse); break;
                    default: this.promote(Queen);
                }
                return true;
            }

            targetPiece.kill();
            this.setPosition(targetPiece.x, targetPiece.y);
            return true;
        }

        const enpassant = this.validEnpassants().find((enpassant) => enpassant.position.equals(targetPosition));
        if (enpassant) {
            enpassant.pawn.kill();
            this.setPosition(enpassant.position.x, enpassant.position.y);
            return true;
        }

        return false;
    }

    get promotedPiece() {
        return this._promotedPiece;
    }

    get isEnpassantable() {
        return this._isEnpassantable;
    }
}