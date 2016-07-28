var cnv, ctx, cW = cH = 800, gW = gH = 30, gSz = Math.floor(Math.min(cW / gW, cH / gH)), grid = [], colors = ['white', 'red', 'blue'], p1 = true
$(function() {
    cnv = $('#cnv')
    cnv[0].width = cW
    cnv[0].height = cH
    cnv.click(function(e) {
        var x = e.pageX - cnv.position().left, y = e.pageY - cnv.position().top
        var gX = Math.floor(x / gSz), gY = Math.floor(y / gSz)
        var player = p1 ? 1 : 2, enemy = p1 ? 2 : 1
        p1 = !p1
        if (grid[gX][gY] === 0) {
            grid[gX][gY] = player
        }
        var captured = []
        for (var i = 0; i < gW; i ++) {
            for (var i2 = 0; i2 < gH; i2 ++) {
                if (surrounded(i, i2, player, enemy)) {
                    captured.push([i, i2])
                }
            }
        }
        for (var i = 0; i < captured.length; i ++) {
            grid[captured[i][0]][captured[i][1]] = 0
        }
        repaintGrid()
    })
    var oldGX = oldGY = 0
    cnv.mousemove(function(e) {
        var x = e.pageX - cnv.position().left, y = e.pageY - cnv.position().top
        var gX = Math.floor(x / gSz), gY = Math.floor(y / gSz)
        repaintGrid(oldGX - 1, oldGY - 1, 2, 2)
        oldGX = gX
        oldGY = gY
        ctx.strokeStyle = 'red'
        ctx.lineWidth = Math.floor(gSz / 4)
        ctx.strokeRect(gX * gSz, gY * gSz, gSz, gSz)
    })
    ctx = cnv[0].getContext('2d')

    // fill grid
    for (var i = 0; i < gW; i ++) {
        grid.push([])
        for (var i2 = 0; i2 < gH; i2 ++) {
            grid[i].push(0)
        }
    }

    repaintGrid()
})
function repaintGrid(x, y, w, h) {
    if (!x) x = 0
    if (!y) y = 0
    if (!w) w = gW
    if (!h) h = gH
    for (var i = 0; i < gW; i ++) {
        for (var i2 = 0; i2 < gH; i2 ++) {
            if (i >= x && i <= x + w && i2 >= y && i2 <= y + h) {
                ctx.fillStyle = colors[grid[i][i2]]
                ctx.fillRect(i * gSz, i2 * gSz, gSz, gSz)
                ctx.strokeStyle = 'black'
                ctx.lineWidth = Math.floor(gSz / 10)
                ctx.strokeRect(i * gSz, i2 * gSz, gSz, gSz)
            }
        }
    }
}
function surrounded(x, y, player, enemy) {
    if (grid[x][y] !== enemy) return false
    var deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (var i = 0; i < deltas.length; i ++) {
        var d = deltas[i]
        if (!(!grid[x + d[0]] || grid[x + d[0]][y + d[1]] === player)) return false
    }
    return true
}