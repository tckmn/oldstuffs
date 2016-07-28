var winLoad = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(winLoad)
    }
}, 10)

var mainLoop, llamas = [], llives = 5, score = 0
function begin() {
    initVars()
    initHud()
    hudtxt.innerHTML = 'Loading images...'
    initImages(prepareToStart)
}

function prepareToStart() {
    hudtxt.innerHTML = 'Click to begin!<br/>Click and drag llamas from the lake<br/>to the wooden platform on the right'
    ovr.onmousedown = startGame
}

function startGame() {
    updateHud()
    mainLoop = setInterval(tick, 40)
    ovr.onmousedown = function(e) {
        e.preventDefault()
        handleMouseDown(e.pageX, e.pageY)
    }
}

var timeToNext = 0, nextCount = 0, mult = 35
function tick() {
    mult *= 0.999
    nextCount ++
    if (nextCount > timeToNext) {
        nextCount = 0
        timeToNext = Math.random() * (mult + 15) + ((mult + 15) * 0.3)
        var newLlama = new Llama(Math.random() * (csz - dw - wdw), Math.random() * (csz - dh), 0)
        var canDraw = true
        for (var i = 0; i < llamas.length; i ++) {
            if (llamasIntersecting(newLlama.x, newLlama.y, llamas[i].x, llamas[i].y)) {
                canDraw = false
                timeToNext = 5
            }
        }
        if (canDraw) {
            ctx.drawImage(drowning, newLlama.x, newLlama.y, dw, dh)
            llamas.push(newLlama)
        }
    }
    for (var i = 0; i < llamas.length; i ++) {
        llamas[i].time ++
        if (llamas[i].time % 25 == 0) {
            var stage = llamas[i].time / 25 - 2
            if (stage < 0) continue
            ctx.clearRect(llamas[i].x, llamas[i].y, dw, dh)
            if (stage == 3) {
                txtAt('Llama drowned', llamas[i].x + dw/2, llamas[i].y + dh/2)
                llamas.splice(i, 1)
                loseLlife()
                continue
            }
            ctx.drawImage(counts[stage], llamas[i].x, llamas[i].y, dw, dh)
        }
    }
}

function handleMouseDown(mx, my) {
    for (var i = 0; i < llamas.length; i ++) {
        if (clickingLlama(llamas[i].x, llamas[i].y, mx, my)) {
            ctx.clearRect(llamas[i].x, llamas[i].y, dw, dh)
            llamas.splice(i, 1)
            var oldX = mx, oldY = my
            ovr.onmousemove = function(e) {
                clearDraggingAt(oldX, oldY)
                drawDraggingAt(e.pageX, e.pageY)
                oldX = e.pageX; oldY = e.pageY
            }
            ovr.onmouseup = function(e) {
                clearDraggingAt(oldX, oldY)
                if (oldX > wdx - pw / 2) {
                    txtAt('Llama saved!', oldX, oldY)
                    addPoints(10)
                } else {
                    txtAt('Llama not saved', oldX, oldY)
                }
                ovr.onmousemove = function(e){}
                ovr.onmouseup = function(e){}
            }
        }
    }
}