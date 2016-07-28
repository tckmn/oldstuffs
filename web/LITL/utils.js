var ovr, txts, cnv, ctx, bg, bgctx, wd, wdctx, pk, pkctx, csz, dw, dh, pw, ph, wdx, wdw
function initVars() {
    ovr = document.getElementById('overlay')
    txts = document.getElementById('txt')
    cnv = document.getElementById('cnv')
    ctx = cnv.getContext('2d')
    bg = document.getElementById('bg')
    bgctx = bg.getContext('2d')
    wd = document.getElementById('wood')
    wdctx = wd.getContext('2d')
    pk = document.getElementById('pick')
    pkctx = pk.getContext('2d')
    csz = getUserWidth()
    setCanvasSizes([cnv,bg,wd,pk])
    setDivSizes([ovr,txts])
    dw = (7/60)*csz
    dh = (57/600)*csz
    pw = dh
    ph = (3/25)*csz
    wdx = (5/6)*csz
    wdw = (1/6)*csz
    txts.style.fontSize = .05*csz+'px'
}

var hudtxt
function initHud() {
    hudtxt = document.createElement('span')
    updateHud()
    txts.appendChild(hudtxt)
    with (hudtxt.style) {
        position = 'absolute'
        top = '0px'
        left = '0px'
    }
}

function updateHud() {
    hudtxt.innerHTML = 'Llives: ' + llives + '<br/>Score: ' + score
}

var drowning, counts, picked
function initImages(callback) {
    var bdone, wdone, ddone, pdone, c3d, c2d, c1d
    var bgImg = new Image()
    bgImg.onload = function(){bdone=true;bgctx.drawImage(bgImg, 0, 0, csz, csz)}
    bgImg.src = 'lake.png'
    var wood = new Image()
    wood.onload = function(){wdone=true;wdctx.drawImage(wood, wdx, 0, wdw, csz)}
    wood.src = 'wood.png'
    drowning = new Image()
    ddone = false
    drowning.onload = function(){ddone = true}
    drowning.src = 'drowning.png'
    picked = new Image()
    pdone = false
    picked.onload = function(){pdone = true}
    picked.src = 'picked.png'
    counts = [new Image(), new Image(), new Image()]
    c3d = false
    c2d = false
    c1d = false
    counts[0].onload = function(){c3d = true}
    counts[0].src = 'count3.png'
    counts[1].onload = function(){c2d = true}
    counts[1].src = 'count2.png'
    counts[2].onload = function(){c1d = true}
    counts[2].src = 'count1.png'
    var lCheck = setInterval(function() {
        if (bdone && wdone && ddone && pdone && c3d && c2d && c1d) {
            callback()
            clearInterval(lCheck)
        }
    }, 10)
}

function txtAt(message, xpos, ypos) {
    var txtEl = document.createElement('span')
    txtEl.innerHTML = message
    txts.appendChild(txtEl)
    var txtw = txtEl.offsetWidth, txth = txtEl.offsetHeight
    var txtx = (xpos-txtw/2), txty = (ypos-txth/2)
    txtEl.style.position = 'absolute'
    if (txtx + txtw > csz) txtx = csz - txtw
    if (txtx < 0) txtx = 0
    if (txty + txth > csz) txty = csz - txth
    if (txty < 0) txty = 0
    txtEl.style.left = txtx + 'px'
    txtEl.style.top = txty + 'px'
    setTimeout(function() {
        txts.removeChild(txtEl)
    }, 1000)
}

function Llama(x,y,time) {
    this.x=x
    this.y=y
    this.time = time
}

function loseLlife() {
    llives --
    updateHud()
    if (llives == 0) gameOver()
}

function gameOver() {
    clearInterval(mainLoop)
    for (var i = 0; i < llamas.length; i ++) {
        ctx.clearRect(llamas[i].x, llamas[i].y, dw, dh)
    }
    llamas = []
    hudtxt.innerHTML = 'Game over<br/>Score: ' + score
    setTimeout(function() {
        hudtxt.innerHTML += '<br/>Click anywhere to play again'
        ovr.onmousedown = function(){
            mult = 50
            llives = 5
            score = 0
            startGame()
        }
    }, 3000)
}

function addPoints(n) {
    score += n
    updateHud()
}

function setCanvasSizes(arr) {
    for (var i = 0; i < arr.length; i ++) {
        arr[i].width = csz
        arr[i].height = csz
    }
}

function setDivSizes(arr) {
    for (var i = 0; i < arr.length; i ++) {
        arr[i].style.width = csz+'px'
        arr[i].style.height = csz+'px'
    }
}

function clearDraggingAt(mx, my) {
    pkctx.clearRect(mx - pw/2, my - ph/2, pw, ph)
}

function drawDraggingAt(mx, my) {
    pkctx.drawImage(picked, mx - pw/2, my - ph/2, pw, ph)
}

function llamasIntersecting(x1, y1, x2, y2) {
    return ((x1 > x2 - dw) && (x1 < x2 + dw)) && ((y1 > y2 - dh) && (y1 < y2 + dh))
}

function clickingLlama(lx, ly, mx, my) {
    return ((mx > lx) && (mx < lx + dw)) && ((my > ly) && (my < ly + dh))
}

function getUserWidth() {
    return window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
}