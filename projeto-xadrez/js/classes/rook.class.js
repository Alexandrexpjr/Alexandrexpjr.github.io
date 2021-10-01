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