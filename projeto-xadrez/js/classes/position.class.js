class Position {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    toString() {
        return `(${this._x}, ${this._y})`;
    }

    equals(anotherPosition) {
        return this._x === anotherPosition.x && this._y === anotherPosition.y;
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