window.onload = function() { // just wrap all the code

Chess = (function(params) {
    var WIDTH = params.width || 600,
        HEIGHT = params.height || 600,
        FANCY = params.fancy || false,
        sqW = WIDTH / 8, sqH = HEIGHT / 8,
        abs = Math.abs // for convenience

    // Piece images
    var pieceImages = new Image()
    pieceImages.src = 'pieces.png?1'
    var GRID_SIZE = 62

    // Helper class for pieces
    var Piece = {
        EMPTY: 0,
        KING: 1,
        QUEEN: 2,
        ROOK: 3,
        BISHOP: 4,
        KNIGHT: 5,
        PAWN: 6,
        toName: function(piece) {
            return 'empty king queen rook bishop knight pawn'.split('')[abs(piece.type)]
        },
        color: function(piece) {
            if (piece == Piece.EMPTY) return null
            return piece < 0 ? 'black' : 'white'
        }
    }

    // Setting up board
    // The row with the king on it
    function homeRow(black) {
        var row = [Piece.ROOK, Piece.KNIGHT, Piece.BISHOP, Piece.KING,
                   Piece.QUEEN, Piece.BISHOP, Piece.KNIGHT, Piece.ROOK]
        if (black) {
            for (var i = 0; i < row.length; i ++) row[i] *= -1
        }
        return row
    }
    // A row filled with a certain piece
    function rowOf(piece, black) {
        var row = Array(8)
        for (var i = 0; i < row.length; i ++) {
            row[i] = piece * (black ? -1 : 1)
        }
        return row
    }
    // Setup
    var board = [
        homeRow(true),
        rowOf(Piece.PAWN, true),
        rowOf(Piece.EMPTY),
        rowOf(Piece.EMPTY),
        rowOf(Piece.EMPTY),
        rowOf(Piece.EMPTY),
        rowOf(Piece.PAWN, false),
        homeRow(false)
    ]

    // Now we will create the canvases.
    function getChessCanvas() {
        var c = document.createElement('canvas')
        c.width = WIDTH
        c.height = HEIGHT
        c.style.position = 'absolute'
        c.style.top = c.style.left = '0px'
        return {
            cnv: c,
            ctx: c.getContext('2d')
        }
    }
    var bcc = getChessCanvas(), pcc = getChessCanvas()
    // The canvas on which the board is drawn
    var boardCnv = bcc.cnv,
        boardCtx = bcc.ctx,
    // The canvas on which the dragging piece is drawn
        pieceCnv = pcc.cnv,
        pieceCtx = pcc.ctx,
    // The overlay for mouse events
        overlay = document.createElement('div')
    overlay.style.width = WIDTH + 'px'
    overlay.style.height = HEIGHT + 'px'
    overlay.style.position = 'absolute'
    overlay.style.top = overlay.style.left = '0px'

    // The div we will return
    var container = document.createElement('div')
    container.appendChild(boardCnv)
    container.appendChild(pieceCnv)
    container.appendChild(overlay)
    container.style.position = 'relative'

    // Mouse events
    var heldPiece = null, oldX = -1, oldY = -1
    overlay.onmousedown = function(e) {
        e.preventDefault()
        var sq = squareOfEvent(e)
        heldPiece = board[sq.x][sq.y]
        oldX = sq.x; oldY = sq.y
        overlay.onmousemove(e)
        board[sq.x][sq.y] = Piece.EMPTY
        repaint()
    }
    overlay.onmouseup = function(e) {
        e.preventDefault()
        var sq = squareOfEvent(e)
        if (validateMove(heldPiece, oldX, oldY, sq.x, sq.y)) {
            board[sq.x][sq.y] = heldPiece
        } else {
            board[oldX][oldY] = heldPiece
        }
        heldPiece = null
        pieceCtx.clearRect(0, 0, WIDTH, HEIGHT)
        repaint()
    }
    overlay.onmousemove = function(e) {
        if (heldPiece !== null) {
            pieceCtx.clearRect(0, 0, WIDTH, HEIGHT)
            var p = coordsOfEvent(e)
            drawPiece(heldPiece, pieceCtx, p.y - sqW / 2, p.x - sqH / 2)
        }
    }
    function coordsOfEvent(e) {
        return {
            x: e.pageY - container.offsetTop,
            y: e.pageX - container.offsetLeft
        }
    }
    function squareOfEvent(e) {
        return {
            x: (e.pageY - container.offsetTop) / sqW | 0,
            y: (e.pageX - container.offsetLeft) / sqH | 0
        }
    }

    // Move validation
    function validateMove(piece, fromX, fromY, toX, toY) {
        var dest = board[toX][toY]
        if (Piece.color(piece) == Piece.color(dest)) return false
        switch (abs(piece)) {
            case Piece.KING:
                return abs(fromX - toX) <= 1 &&
                       abs(fromY - toY) <= 1
            case Piece.QUEEN:
                break
            case Piece.ROOK:
                var xAxis
                if (fromX == toX) xAxis = true
                else if (fromY == toY) xAxis = false
                else return false

                var from = xAxis ? fromY : fromX
                    to = xAxis ? toY : toX,
                    forwards = from < to,
                    step = forwards ? 1 : -1

                for (var i = from + step; forwards ? (i < to) : (i > to); i += step) {
                    pathPiece = xAxis ? board[toX][i] : board[i][toY]
                    if (pathPiece !== Piece.EMPTY) return false
                }
            case Piece.BISHOP:
                var dx = toX - fromX, dy = toY - fromY
                if (abs(dx) != abs(dy)) return false
                var stepX = dx && dx / abs(dx),
                    stepY = dy && dy / abs(dy)
                break
            case Piece.KNIGHT:
                break
            case Piece.PAWN:
                break
        }
        return true
    }

    // Drawing the board
    function repaint() {
        // Drawing the squares
        var cols = ['#D18B47', '#FFCE9E'], ci = 0
        for (var i = 0; i < board.length; i ++) {
            for (var i2 = 0; i2 < board[i].length; i2 ++) {
                var x = i2 * sqH, y = i * sqW

                boardCtx.fillStyle = cols[ci]
                boardCtx.fillRect(x, y, sqW, sqH)
                ci = (ci + 1) % cols.length

                // Drawing the piece on the square
                drawPiece(board[i][i2], boardCtx, x, y)
            }
            ci = (ci + 1) % cols.length
        }
    }
    function drawPiece(p, ctx, x, y) {
        ctx.drawImage(pieceImages, // image to draw
                      GRID_SIZE * (abs(p) - 1), // clipping x
                      GRID_SIZE * ((p > 0 ? 0 : 1) + (FANCY ? 2 : 0)), // clipping y
                      GRID_SIZE, GRID_SIZE, // clipping w/h
                      x, y, sqW, sqH) // location x/y/w/h
    }

    // The Chess object that is used publicly
    return {
        init: function() {
            repaint()
            return container
        }
    }
})({
    // fancy: confirm('Use fancy pieces?')
    fancy: true
})

document.body.appendChild(Chess.init())

} // end onload