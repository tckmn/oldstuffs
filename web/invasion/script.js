//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//             WELCOME TO THE SOURCE CODE FOR INVASION GAME!            //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////

// declarations
var canvas, ctx, // canvas stuff
    allyImgArr, allyLoadArr, enImgArr, enLoadArr, // for image loading
    mx, my, // mouse
    allyList = new Array(), enemyList = new Array(), // obvious
    addingList, addTimeout, // for adding allies
    bullets = new Array() // also obvious

// logging
var logDOM

// yay start
function begin() {
    // logging
    logDOM = document.getElementById('log')

    // canvas setup
    canvas = document.getElementById('canvas')
    canvas.addEventListener('mousemove', function(e) {
        mx = e.pageX - canvas.offsetLeft
        my = e.pageY - canvas.offsetTop
    }, true)
    ctx = canvas.getContext('2d')

    // key binding
    window.addEventListener('keydown', function(e) {
        var relCode = (e.charCode || e.keyCode) - 49
        if (relCode >= 0 && relCode <= 8) {
            addingList[relCode] = true
        }
    }, true)
        window.addEventListener('keyup', function(e) {
        var relCode = (e.charCode || e.keyCode) - 49
        if (relCode >= 0 && relCode <= 8) {
            addingList[relCode] = false
        }
    }, true)

    // load up the ally images
    var allies = 4
    allyImgArr = new Array(allies)
    allyLoadArr = new Array(allies)
    addingList = new Array(allies)
    addTimeout = new Array(allies)
    for (var i = 0; i < addTimeout.length; i ++) {
        addTimeout[i] = 0
    }
    for (var i = 0; i < allies; i ++) {
        allyLoadArr[i] = false
        allyImgArr[i] = new Image()
        allyImgArr[i].src='ally'+i+'.png?loadID=1'
        allyImgArr[i].onload = (function(i){return function(){allyLoadArr[i] = true}})(i);
    }

    // load up the enemy images
    var enemies = 4
    enImgArr = new Array(allies)
    enLoadArr = new Array(allies)
    for (var i = 0; i < allies; i ++) {
        enLoadArr[i] = false
        enImgArr[i] = new Image()
        enImgArr[i].src='enemy'+i+'.png?loadID=1'
        enImgArr[i].onload = (function(i){return function(){enLoadArr[i] = true}})(i);
    }

    // start checking to see if all of the stuff is loaded
    checkLoad()
}

// ally or enemy
function Creature(id, x, y, spd, range) {
    this._id = id
    this._x = x
    this._y = y
    this._spd = spd
    this._range = range
}

// what do you think a Bullet is? hmm, maybe a BULLET! :D
function Bullet(x, y, angle, spd, friendly) {
    this._x = x
    this._y = y
    this._angle = angle
    this._spd = spd
    this._friendly = friendly
}

// when user presses key to add ally
function tryAddAlly(id) {
    if (addTimeout[id] < 0) {
        allyList.push(new Creature(id, -60, my-25, 2, 200))
        addTimeout[id] = 20
    }
}

// quite obvious from function name
function spawnEnemy(id) {
    enemyList.push(new Creature(id, 660, Math.floor(Math.random() * 540), 2, 200))
}

// check to see if images are loaded
function checkLoad() {
    var loaded = true

    // check ally images
    for (var i = 0; i < allyLoadArr.length; i ++) {
        if (!allyLoadArr[i]) loaded = false
    }

    // check enemy images
    for (var i = 0; i < enLoadArr.length; i ++) {
        if (!enLoadArr[i]) loaded = false
    }

    if (loaded) {
        startGame()
    } else {
        setTimeout(checkLoad, 100)
    }
}

// gameLoop is the variable that represents... well, the game loop.
var gameLoop
function startGame() {
    gameLoop = setInterval(tick, 50)
}

// PANIC (only used for debugging)
function abort() {
    clearInterval(gameLoop)
}

// most of the game is in here. this is run every 50 milliseconds
function tick() {
    // setup
    ctx.clearRect(0, 0, 600, 600)
    ctx.fillRect(0, my-5, 600, 10)

    // draw allies / make them shoot
    for (var i = 0; i < allyList.length; i ++) {
        var a = allyList[i]
        ctx.drawImage(allyImgArr[a._id], a._x, a._y)
        var noEnemy = true
        for (var i2 = 0; i2 < enemyList.length; i2 ++) {
            var e = enemyList[i2]
            if (Math.abs(e._x - a._x) < a._range && Math.abs(e._y - a._y) < a._range) {
                // enemy found!
                bullets.push(new Bullet(a._x+45, a._y+20, Math.atan2(e._x - a._x, e._y - a._y), 5, true))
                noEnemy = false
            }
        }
        if (noEnemy) a._x += a._spd
    }

    // draw enemies
    for (var i = 0; i < enemyList.length; i ++) {
        var e = enemyList[i]
        e._x -= e._spd
        ctx.drawImage(enImgArr[e._id], e._x, e._y)
    }

    // add allies if needed
    for (var i = 0; i < addingList.length; i ++) {
        addTimeout[i] --
        if (addingList[i]) tryAddAlly(i)
    }

    // draw bullets / move them
    for (var i = 0; i < bullets.length; i ++) {
        var b = bullets[i]
        b._x += Math.sin(b._angle) * b._spd
        b._y += Math.cos(b._angle) * b._spd
        for (var i2 = 0; i2 < (b._friendly ? enemyList : allyList).length; i2 ++) {
            var c = (b._friendly ? enemyList : allyList)[i2]
            if (b._x + 10 > c._x && b._x < c._x + 50 && b._y + 10 > c._y && b._y < c._y + 50) {
                (b._friendly ? enemyList : allyList).splice((b._friendly ? enemyList : allyList).indexOf(c), 1)
            }
        }
        ctx.fillRect(b._x, b._y, 10, 10)
    }

    // spawning code
    if (Math.random() < 0.02) spawnEnemy(Math.floor(Math.random() * 4))
}

// better window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10);

// logging
function log(x) {
    logDOM.innerHTML = x
}