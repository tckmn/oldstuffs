//////////////////////////////////////////////////////////////////////////
//         WELCOME TO THE SOURCE CODE FOR LLAMA EXPLORATION GAME!       //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

// NOTE: code for a-star is in the file "astar.js"

//window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10)

//variable declarations
var cnv, ctx, //canvas variables
    map, doNotParse, //map
    lX, lY, //llama position
    paused = false //for click to continue
//world generation constants
var WORLD_SIZE = 100, ROOM_AMOUNT = 200, ROOM_SIZE = 3, RND_BLANK_AMOUNT = 1000, ENEMY_AMOUNT = 100

function begin() {
    cnv = document.getElementById('cnv')
    cnv.onclick = function(e) {
        if (paused) {
            redraw()
            paused = false
        } else {
            handleClick(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
        }
    }
    ctx = cnv.getContext('2d')
    generateNewMap()
    redraw()
}

function drawMap() {
    drawImageOnLoad('grass.png', 0, 0, 450, 450)
    var animalsToUpdate = []
    for (var i = -4; i <= 4; i ++) {
        for (var i2 = -4; i2 <= 4; i2 ++) {
            if (map[lX+i][lY+i2].substring(0, 3) === 'a/a') {
                animalsToUpdate.push([lX+i,lY+i2])
            }
            drawImageOnLoad(map[lX+i][lY+i2], (i+4)*50, (i2+4)*50, 50, 50)
        }
    }
    for (var i = 0; i < animalsToUpdate.length; i ++) {

    }
}

//redraw with llama
function redraw() {
    drawing = false
    drawMap()
    drawImageOnLoad('llama.png', 200, 200, 50, 50)
}

function handleClick(xPos, yPos) {
    if (!drawing) moveLlama(Math.floor(xPos/50), Math.floor(yPos/50))
}

//move llama using a-star, to coords relative to top-left corner of viewport
function moveLlama(toX,toY) {
    drawing = true
    ctx.fillStyle = 'rgba(255,0,0,0.5)'
    oLX = lX
    oLY = lY
    try {
        moveLlamaOnPath(aStar(toX, toY))
    } catch (anError) {
        showMessage('You can\'t go there!')
        drawing = false
    }
}

//input: a-star output array. animates llama motion.
var oLX, oLY
function moveLlamaOnPath(res) {
    updateEnemies()
    lX = oLX + res[0].x - 4
    lY = oLY + res[0].y - 4
    redraw()
    res.splice(0,1)
    if (res.length !== 0) setTimeout(function(){moveLlamaOnPath(res)}, 200)
}

function cloneCanvas(oldCanvas) {
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context.drawImage(oldCanvas, 0, 0);
    return newCanvas;
}

//kind of like an unobtrusive alert()
function showMessage(str) {
    ctx.font = '20px sans-serif'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 150, 450, 40)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(str, 225, 150)
    ctx.fillText('(click to continue)', 225, 170)
    paused = true
}

//draw a red path, unused for now
var drawing = false
function drawAStar(res, callback){
    ctx.fillRect(res[0].x*50,res[0].y*50,50,50)
    res.splice(0,1)
    if (res.length === 0) setTimeout(callback, 100)
    else setTimeout(function(){drawAStar(res, callback)}, 100)
}

function arrIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
}

var readyToDraw = true
function drawImageOnLoad(imgStr, x, y, w, h) {
    if (!readyToDraw) {
        setTimeout(function(){drawImageOnLoad(imgStr, x, y, w, h)}, 5)
        return
    }
    var img = new Image()
    img.src = imgStr
    if (img.complete) ctx.drawImage(img, x, y, w, h)
    else {
        readyToDraw = false
        img.onload = function() {readyToDraw = true; ctx.drawImage(img, x, y, w, h)}
    }
}

function generateNewMap() {
    map = new Array(WORLD_SIZE)
    doNotParse = new Array(WORLD_SIZE)
    for (var i = 0; i < WORLD_SIZE; i ++) {
        map[i] = new Array(WORLD_SIZE)
        doNotParse[i] = new Array(WORLD_SIZE)
        for (var i2 = 0; i2 < WORLD_SIZE; i2 ++) {
            map[i][i2] = 'block.png'
            doNotParse[i][i2] = false
        }
    }
    lX = Math.floor(WORLD_SIZE/2)
    lY = Math.floor(WORLD_SIZE/2)
    map[lX][lY] = 'blank.png'
    var genStack = [lX, lY]

    //Generating maze
    while (true) {
        var dirArr = []
        if (lX + 1 < WORLD_SIZE && map[lX+1][lY] == 'block.png' && (lX + 2 >= WORLD_SIZE || map[lX+2][lY] == 'block.png') && (lY - 1 < 0 || map[lX+1][lY-1] == 'block.png') &&
            (lY + 1 >= WORLD_SIZE || map[lX+1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([1, 0])
        }
        if (lX - 1 >= 0 && map[lX-1][lY] == 'block.png' && (lX - 2 < 0 || map[lX-2][lY] == 'block.png') && (lY - 1 < 0 || map[lX-1][lY-1] == 'block.png') &&
            (lY + 1 >= WORLD_SIZE || map[lX-1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([-1, 0])
        }
        if (lY + 1 < WORLD_SIZE && map[lX][lY+1] == 'block.png' && (lY + 2 >= WORLD_SIZE || map[lX][lY+2] == 'block.png') && (lX + 1 >= WORLD_SIZE || map[lX+1][lY+1] == 'block.png') &&
            (lX - 1 < 0 || map[lX-1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([0, 1])
        }
        if (lY - 1 >= 0 && map[lX][lY-1] == 'block.png' && (lY - 2 < 0 || map[lX][lY-2] == 'block.png') && (lX + 1 >= WORLD_SIZE || map[lX+1][lY-1] == 'block.png') &&
            (lX - 1 < 0 || map[lX-1][lY-1] == 'block.png')) {
            dirArr = dirArr.concat([0, -1])
        }
        if (dirArr.length === 0) {
            lY = genStack.pop()
            lX = genStack.pop()
            if (genStack.length === 0) {
                break
            }
            continue
        }
        var index = Math.floor(Math.random() * (dirArr.length / 2))
        lX += dirArr[index*2]
        lY += dirArr[index*2+1]
        map[lX][lY] = 'blank.png'
        genStack.push(lX)
        genStack.push(lY)
    }
    map[lX + 4][lY + 4] = 'blank.png'
    //End generating maze

    //Generating rooms
    for (var i = 0; i < ROOM_AMOUNT; i ++) {
        var tX = Math.floor(Math.random() * WORLD_SIZE),
            tY = Math.floor(Math.random() * WORLD_SIZE),
            tW = Math.floor(Math.random() * ROOM_SIZE),
            tH = Math.floor(Math.random() * ROOM_SIZE)
        for (var i2 = tX - tW; i2 < tX + tW; i2 ++) {
            if (i2 >= 0 && i2 < WORLD_SIZE) {
                for (var i3 = tY - tH; i3 < tY + tH; i3 ++) {
                    if (i3 >= 0 && i3 < WORLD_SIZE) {
                        map[i2][i3] = 'blank.png'
                    }
                }
            }
        }
    }
    //End generating rooms

    //Random blank spots
    for (var i = 0; i < RND_BLANK_AMOUNT; i ++) {
        map[Math.floor(Math.random() * WORLD_SIZE)][Math.floor(Math.random() * WORLD_SIZE)] = 'blank.png'
    }
    //End random blank spots

    //Enemies
        for (var i = 0; i < ENEMY_AMOUNT; i ++) {
        map[Math.floor(Math.random() * WORLD_SIZE)][Math.floor(Math.random() * WORLD_SIZE)] = 'a/a' + Math.floor(Math.random()*30) + '.png'
    }
    //End enemies
}