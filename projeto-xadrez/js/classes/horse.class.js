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