class Pawn extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'Pawn', '&#9823', color);
        this._isEnpassantable = false;
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
    
    notEmpassantableAnymore() {
        this._isEnpassantable = false;
    }
    
    onBeforeMove(oldPosition, newPosition) {
        if (!this._hasMoved && Math.abs(oldPosition.y - newPosition.y) === 2) {
            this._isEnpassantable = true;
        }
    }

    onAttack(targetPosition) {
        const targetPiece = this._chessBoard.getPieceAtPosition(targetPosition.x, targetPosition.y);

        if (targetPiece && targetPiece.isAlive) {
            targetPiece.kill();
            this.setPosition(targetPiece.x, targetPiece.y);
        } else {
            const enpassant = this.validEnpassants().find((enpassant) => enpassant.position.equals(targetPosition));

            if (enpassant) {
                enpassant.pawn.kill();
                this.setPosition(enpassant.position.x, enpassant.position.y);
            }
        }
    }

    get isEnpassantable() {
        return this._isEnpassantable;
    }
}