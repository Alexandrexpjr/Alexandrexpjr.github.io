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
            const oldPosition = new Position(this.x, this.y);
            const newPosition = new Position(x, y);
            
            this.onBeforeMove(oldPosition, newPosition);
            this.onMove(oldPosition, newPosition);
            this.onAfterMove(oldPosition, newPosition);

            return true;
        }

        return false;
    }

    attack(x, y) {
        if (this.isAlive && this.canAttack(x, y)) {
            const targetPosition = new Position(x, y);

            this.onBeforeAttack(targetPosition);
            this.onAttack(targetPosition);
            this.onAfterAttack(targetPosition);

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

    onBeforeMove(oldPosition, newPosition) {

    }

    onMove(oldPosition, newPosition) {
        this.setPosition(newPosition.x, newPosition.y);
        this._hasMoved = true;
    }

    onAfterMove(oldPosition, newPosition) {

    }

    onBeforeAttack(targetPosition) {

    }
    
    onAttack(targetPosition) {
        const targetPiece = this._chessBoard.getPieceAtPosition(targetPosition.x, targetPosition.y);

        if (targetPiece && targetPiece.isAlive) {
            targetPiece.kill();
            this.setPosition(targetPiece.x, targetPiece.y);
        }
    }

    onAfterAttack(targetPosition) {

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

    get hasMoved() {
        return this._hasMoved;
    }

    get isDead() {
        return this._isDead;
    }

    get isAlive() {
        return !this._isDead;
    }
}