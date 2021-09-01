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
    attack: {
        canMoveOverPieces: false,
        attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    },
	view: '&#9819'
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
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: true,
    },
    view: '&#9818'
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
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9821'
}

const whiteHorse = {
    position: {
		line: 1,
		column: 7
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
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: true,
        mustMoveUnderAttack: false,
    },
    view: '&#9822'    
}

const whiteRook = {
    position: {
		line: 1,
		column: 8
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
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9820;'    
}

const whitePawn = {
    position: {
		line: 2,
		column: 1
	},
	color: white,
    move: {
        horizontal: {
            isLegal: false,
            limited: false
        },
        vertical: {
            isLegal: true,
            limited: true
        },
        diagonal: {
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9823;'    
}  


const blackQueen = {
    position: {
		line: 8,
		column: 4
	},
	color: black,
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
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9819'
}

const blackKing = {
    position: {
		line: 8,
		column: 5
	},
	color: black,
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
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: true,
    },
    view: '&#9818'
}

const blackBishop = {
    position: {
		line: 8,
		column: 6
	},
	color: black,
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
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9821'
}

const blackHorse = {
    position: {
		line: 8,
		column: 7
	},
	color: black,
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
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: true,
        mustMoveUnderAttack: false,
    },
    view: '&#9822'    
}

const blackRook = {
    position: {
		line: 8,
		column: 8
	},
	color: black,
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
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9820;'    
}

const blackPawn = {
    position: {
		line: 7,
		column: 1
	},
	color: black,
    move: {
        horizontal: {
            isLegal: false,
            limited: false
        },
        vertical: {
            isLegal: true,
            limited: true
        },
        diagonal: {
            isLegal: false,
            limited: false
        },
    },
    attack: {
        canMoveOverPieces: false,
        mustMoveUnderAttack: false,
    },
    view: '&#9823;'    
}  
