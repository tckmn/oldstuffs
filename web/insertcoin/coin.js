alert('Use WASD to move!')

function Enemy(img) {
    this.w = img.width
    this.h = img.height
    this.img = img
    var coords = edge(this)
    this.x = coords.x
    this.y = coords.y
    var target = {x: p.x, y: p.y}
    var theta = Math.atan2(-(target.y - coords.y), target.x - coords.x) + Math.PI / 2
    this.spd = 4
    this.vx = Math.sin(theta) * this.spd
    this.vy = Math.cos(theta) * this.spd
    this.rot = theta
}

function Bullet(startX, startY, endX, endY) {
    this.dx = Math.abs(endX - startX)
    this.dy = Math.abs(endY - startY)
    this.err = this.dx - this.dy
    this.sx = startX < endX ? 1 : -1
    this.sy = startY < endY ? 1 : -1
    this.x = startX
    this.y = startY
    this.spd = 9
}

Bullet.prototype.updatePosition = function() {
    var index = this.spd
    while (index --> 0) {
        var err2 = this.err * 2
        if (err2 > -this.dy) {
            this.err -= this.dy
            this.x += this.sx
        }
        if (err2 < this.dx) {
            this.err += this.dx
            this.y += this.sy
        }
    }
}

var strings = {
    noReqAnimFrameMsg: 'Your browser does not support requestAnimationFrame. The game will still work without it, but please upgrade your browser (latest version of Google Chrome or Mozilla Firefox recommended) for a smoother and more enjoyable experience.'
}

var cnv, ctx, cW = cH = 600,
    reqAnimFrame = requestAnimationFrame ||
                   webkitRequestAnimationFrame ||
                   mozRequestAnimationFrame ||
                   msRequestAnimationFrame ||
                   oRequestAnimationFrame ||
                   (alert(strings.noReqAnimFrameMsg), function(x){setInterval(x,10)}),
    p = {x: 100, y: 100, xv: 0, yv: 0, spd: 2, rot: 0, rspd: 0.02, rv: 0, fric: 0.9, rfric: 0.9, lives: 5, maxlives: 5, cooldown: 15, cooldownI: 0},
    es = [],
    bullets = [],
    keysDown = {},
    images = {
        player: 'player.png',
        enemy: 'enemy.png',
        bullet: 'bullet.png'
    }

window.addEventListener('load', function() {
    cnv = document.getElementById('c')
    cnv.style.border = '1px solid black'
    ctx = cnv.getContext('2d')
    cnv.width = cW
    cnv.height = cH

    var imgLoadedCount = totalImageCount = 0
    for (img in images) totalImageCount++
    for (img in images) {
        var src = images[img]

        images[img] = new Image()
        images[img].onload = function() { imgLoadedCount++; if(imgLoadedCount == totalImageCount) init() }
        images[img].src = src
    }
})

function init() {
    p.img = images.player
    p.w = p.img.width
    p.h = p.img.height

    Bullet.prototype.img = images.bullet
    Bullet.prototype.w = Bullet.prototype.img.width
    Bullet.prototype.h = Bullet.prototype.img.height

    ctx.font = '30px sans-serif'
    ctx.textBaseline = 'top'

    tick()
}

window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true
})

window.addEventListener('keyup', function(e) {
    keysDown[e.keyCode] = false
})

function tick() {
    if (Math.random() < 0.02) spawnEnemy()
    ctx.clearRect(0, 0, cW, cH)

    ctx.fillText(p.lives + '/' + p.maxlives + ' lives left', 0, 0)

    if (keysDown[87]) {
        p.xv += Math.sin(p.rot) * p.spd
        p.yv -= Math.cos(p.rot) * p.spd
    }
    if (keysDown[83]) {
        p.xv -= Math.sin(p.rot) * p.spd
        p.yv += Math.cos(p.rot) * p.spd
    }
    if (keysDown[68]) p.rv += p.rspd
    if (keysDown[65]) p.rv -= p.rspd

    if (keysDown[32] && p.cooldownI <= 0) {
        var bxc = p.x + p.w / 2 - Bullet.prototype.w / 2, byc = p.y + p.h / 2 - Bullet.prototype.h / 2
        var bullet = new Bullet(bxc, byc, bxc + Math.cos(p.rot + Math.PI * 1.5) * 100, byc + Math.sin(p.rot + Math.PI * 1.5) * 100)
        bullets.push(bullet)

        p.cooldownI = p.cooldown
    }

    var bounce = false
    if (p.x < 0) p.x = 0, bounce = true
    if (p.y < 0) p.y = 0, bounce = true
    if (p.x > cW - p.w) p.x = cW - p.w, bounce = true
    if (p.y > cH - p.h) p.y = cH - p.h, bounce = true
    if (bounce) p.xv = -p.xv, p.yv = -p.yv

    p.x += p.xv
    p.y += p.yv
    p.xv *= p.fric
    p.yv *= p.fric
    p.rot += p.rv
    p.rv *= p.rfric

    for (var i = 0; i < es.length; i++) {
        var e = es[i]
        ctx.drawImage(e.img, e.x, e.y)
        e.x += e.vx
        e.y += e.vy
        if (e.x < -e.w || e.x > cW || e.y < -e.h || e.y > cH) {
            es.splice(i--, 1)
            continue
        }
        if (Math.sqrt(Math.pow(p.x - e.x, 2) + Math.pow(p.y - e.y, 2)) < (p.w / 2 + e.w / 2)) {
            es.splice(i--, 1)
            p.lives--
            continue
        }
    }

    for (var i = 0; i < bullets.length; i++) {
        var b = bullets[i]
        ctx.drawImage(b.img, b.x, b.y)

        for (var j = 0; j < es.length; j++) {
            var e = es[j]
            if(Math.sqrt(Math.pow(b.x - e.x, 2) + Math.pow(b.y - e.y, 2)) < (e.w / 2)) {
                es.splice(i--, 1)
                continue
            }
        }

        b.updatePosition()
    }

    ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
    ctx.rotate(p.rot)
    ctx.drawImage(p.img, -p.w / 2, -p.h / 2)
    ctx.rotate(-p.rot)
    ctx.translate(-(p.x + p.w / 2), -(p.y + p.h / 2))

    p.cooldownI--

    reqAnimFrame(tick)
}

function spawnEnemy() {
    es.push(new Enemy(images.enemy))
}

function edge(obj) {
    var e = {}
    if (Math.random() < 0.5) {
        e.x = Math.random() * cW
        e.y = Math.random() < 0.5 ? -obj.h : cH
    } else {
        e.x = Math.random() < 0.5 ? -obj.w : cW
        e.y = Math.random() * cH
    }
    return e
}