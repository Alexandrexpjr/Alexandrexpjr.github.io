const whiteQueen = {
    position: {
		line: 1,
		column: 4
	},
	color: white,
    canMove: {
        horizontal: {
            isLegal: true,
            limited: false
        },
        vertical: {
            isLegal: true,
            limited: false
        },
        diagonal: {
            isLegal: true,
            limited: false
        },
    },
    canMoveUnderAtack: true,
	view: '&#9813'
}

const whiteKing = {
    position: {
		line: 1,
		column: 5
	},
	color: white,
    move: {
        horizontal: {
            isLegal: true,
            limited: true
        },
        vertical: {
            isLegal: true,
            limited: true
        },
        diagonal: {
            isLegal: true,
            limited: true
        },
    },
    canMoveUnderAtack: false,
	view: '&#9812'
}

const whiteBishop = {
    position: {
		line: 1,
		column: 6
	},
	color: white,
    move: {
        horizontal: {
            isLegal: false,
            limited: false
        },
        vertical: {
            isLegal: false,
            limited: false
        },
        diagonal: {
            isLegal: true,
            limited: false
        },
    },
	view: '&#9815'
}

const whiteHorse = {
    position: {
		line: 1,
		column: 7
	},
	color: white,
    move: {
        horizontal: {
            isLegal: true,
            limited: false
        },
        vertical: {
            isLegal: true,
            limited: false
        },
        diagonal: {
            isLegal: true,
            limited: false
        },
    },
	view: '&#9813'    
}

const whiteRook = {
    position: {
		line: 1,
		column: 4
	},
	color: white,
    move: {
        horizontal: {
            isLegal: true,
            limited: false
        },
        vertical: {
            isLegal: true,
            limited: false
        },
        diagonal: {
            isLegal: true,
            limited: false
        },
    },
	view: '&#9813'    
}

const whitePawn = {
    
}

const blackQueen = {

}

const blackKing = {
    
}

const blackBishop = {
    
}

const blackHorse = {
    
}

const blackRook = {
    
}

const blackPawn = {
    
}
