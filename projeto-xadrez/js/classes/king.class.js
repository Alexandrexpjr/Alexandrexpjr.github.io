class King extends Piece {
    constructor(chessBoard, identifier, color) {
        super(chessBoard, identifier, 'King', '&#9818', color);
    }

    validMoves() {
        let moves = [
            ...this.raycast(Directions.N, 1),
            ...this.raycast(Directions.NE, 1),
            ...this.raycast(Directions.E, 1),
            ...this.raycast(Directions.SE, 1),
            ...this.raycast(Directions.S, 1),
            ...this.raycast(Directions.SW, 1),
            ...this.raycast(Directions.W, 1),
            ...this.raycast(Directions.NW, 1)
        ];

        this.validCastles().forEach((castle) => {
            moves.push(castle.position);
        });

        return moves
            .filter((move) => move instanceof Position);
    }

    validAttacks() {
        let targets = [
            ...this.raycast(Directions.N, 1),
            ...this.raycast(Directions.NE, 1),
            ...this.raycast(Directions.E, 1),
            ...this.raycast(Directions.SE, 1),
            ...this.raycast(Directions.S, 1),
            ...this.raycast(Directions.SW, 1),
            ...this.raycast(Directions.W, 1),
            ...this.raycast(Directions.NW, 1)
        ];

        return targets
            .filter((step) => step instanceof Piece)
            .filter((piece) => piece._color !== this._color)
            .map((piece) => piece.position);
    }

    validCastles() {
        let validCastles = [];

        if (this._hasMoved) return validCastles;

        const rookE = this.raycast(Directions.E, 3).find((step) => step instanceof Rook);
        const rookW = this.raycast(Directions.W, 4).find((step) => step instanceof Rook);

        if (rookE && !rookE.hasMoved) {
            validCastles.push({
                position: new Position(this.x + 2, this.y),
                rook: rookE,
                rookPosition: new Position(rookE.x - 2, rookE.y)
            });
        }

        if (rookW && !rookW.hasMoved) {
            validCastles.push({
                position: new Position(this.x - 2, this.y),
                rook: rookW,
                rookPosition: new Position(rookW.x + 3, rookW.y)
            });
        }

        return validCastles;
    }

    onBeforeMove(oldPosition, newPosition) {
        const castle = this.validCastles().find((castle) => castle.position.equals(newPosition));

        if (castle) {
            castle.rook.setPosition(castle.rookPosition.x, castle.rookPosition.y);
        }
    }
}