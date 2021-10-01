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