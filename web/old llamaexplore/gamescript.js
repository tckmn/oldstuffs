//////////////////////////////////////////////////////////////////////////
//         WELCOME TO THE SOURCE CODE FOR LLAMA EXPLORATION GAME!       //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

var size, step, map, doNotParse, lX, lY, up, right, down, left, dirArr, genStack, tmpSq, tX, tY, tW, tH, $tmp;
//Constants
var WORLD_SIZE = 100, SQUARES = 9, SQD2;
//For world generation
var ROOM_AMOUNT = 200, ROOM_SIZE = 3, RND_BLANK_AMOUNT = 1000, ENEMY_AMOUNT = 100;

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        initGame();
        clearInterval(readyStateCheckInterval);
    }
}, 10);

function initGame() {
    step = 5;
    size = 50;
    SQD2 = Math.floor(SQUARES / 2);
    var tDOM = document.getElementById('t')
    for (var i = 0; i < SQUARES; i ++) {
        var newTR = document.createElement('tr')
        newTR.id = 'r'+i
        tDOM.appendChild(newTR)
        for (var i2 = 0; i2 < SQUARES; i2 ++) {
            var newTD = document.createElement('td')
            newTD.id = 'r'+i+'c'+i2
            var newIMG = document.createElement('img')
            newIMG.id = newTD.id + 'i'
            newIMG.src = 'blank.png'
            newIMG.alt = 'ERROR'
            newTD.appendChild(newIMG)
            newTR.appendChild(newTD)
        }
    }
    $('#r' + SQD2 + 'c' + SQD2 + 'i').attr('src', 'llama.png');
    $('#r'+(SQD2-1)+'c'+(SQD2)+'i').click(function() {
        if (up) {
            lX --;
            refresh(true);
        }
    });
    $('#r'+(SQD2)+'c'+(SQD2+1)+'i').click(function() {
        if (right) {
            lY ++;
            refresh(true);
        }
    });
    $('#r'+(SQD2+1)+'c'+(SQD2)+'i').click(function() {
        if (down) {
            lX ++;
            refresh(true);
        }
    });
    $('#r'+(SQD2)+'c'+(SQD2-1)+'i').click(function() {
        if (left) {
            lY --;
            refresh(true);
        }
    });
    initDungeon();
    refresh(false);
    setLoading(false);
}

function initDungeon() {
    generateNewMap();
    if ($('.container').length > 0) {
        $('.container')[0].attr('class', 'invisible');
    }
    $('#dungeon').attr('class', 'container');
}

function refresh(aniMove) {
    updateImages(aniMove);
    singleRefresh(0, 0);
}

function singleRefresh(i, i2) {
    $tmp = $('#r' + i + 'c' + i2);
    $tmp.css('width', size+'px');
    $tmp.css('height', size+'px');
    $tmp = $('#r' + i + 'c' + i2 + 'i');
    $("<img/>").attr("src", $tmp.attr("src")).load(function() {
        if (this.width > this.height) {
            $tmp.css('width', '100%');
            $tmp.css('height', 'auto');
        } else {
            $tmp.css('width', 'auto');
            $tmp.css('height', '100%');
        }
        i ++;
        if (i == SQUARES) {
            i = 0;
            i2 ++;
            if (i2 == SQUARES) {
                return;
            }
        }
        singleRefresh(i, i2);
    });
}

function updateImages(aniMove) {
    for (var i = 0; i < SQUARES; i ++) {
        for (var i2 = 0; i2 < SQUARES; i2 ++) {
            if (lX + i < 0 || lX + i >= WORLD_SIZE || lY + i2 < 0 || lY + i2 >= WORLD_SIZE) {
                $('#r'+i+'c'+i2+'i').attr('src', 'block.png');
            } else {
                if (aniMove && map[lX + i][lY + i2].split('/')[0] == 'a' && !(doNotParse[lX + i][lY + i2])) {
                    dirArr = [];
                    if (lX + i - 1 >= 0 && map[lX + i - 1][lY + i2] == 'blank.png') {
                        dirArr = dirArr.concat([-1, 0]);
                    }
                    if (lY + i2 + 1 < WORLD_SIZE && map[lX + i][lY + i2 + 1] == 'blank.png') {
                        dirArr = dirArr.concat([0, 1]);
                    }
                    if (lX + i + 1 < WORLD_SIZE && map[lX + i + 1][lY + i2] == 'blank.png') {
                        dirArr = dirArr.concat([1, 0]);
                    }
                    if (lY + i2 - 1 >= 0 && map[lX + i][lY + i2 - 1] == 'blank.png') {
                        dirArr = dirArr.concat([0, -1]);
                    }
                    if (dirArr.length === 0) {
                        $('#r'+i+'c'+i2+'i').attr('src', map[lX + i][lY + i2]);
                    } else {
                        var index = Math.floor(Math.random() * (dirArr.length / 2));
                        map[lX + i + dirArr[index*2]][lY + i2 + dirArr[index*2+1]] = map[lX + i][lY + i2];
                        map[lX + i][lY + i2] = 'blank.png';
                        $('#r'+i+'c'+i2+'i').attr('src', map[lX + i][lY + i2]);
                        $('#r'+(i+dirArr[index*2])+'c'+(i2+dirArr[index*2+1])+'i').attr('src', map[lX + i + dirArr[index*2]][lY + i2 + dirArr[index*2+1]]);
                        doNotParse[lX + i + dirArr[index*2]][lY + i2 + dirArr[index*2+1]] = true;
                        if (Math.abs(SQD2 - (i+dirArr[index*2])) <= 1 && Math.abs(SQD2 - (i2+dirArr[index*2+1])) <= 1) {
                            //TODO
                        }
                    }
                } else {
                    $('#r'+i+'c'+i2+'i').attr('src', map[lX + i][lY + i2]);
                }
            }
        }
    }
    for (var i = 0; i < WORLD_SIZE; i ++) {
        for (var i2 = 0; i2 < WORLD_SIZE; i2 ++) {
            doNotParse[i][i2] = false;
        }
    }
    if ($('#r'+(SQD2-1)+'c'+(SQD2)+'i').attr('src') == 'blank.png') {
        up = true;
        $('#r'+(SQD2-1)+'c'+(SQD2)+'i').attr('src', 'arrowup.png');
    } else {
        up = false;
    }
    if ($('#r'+(SQD2)+'c'+(SQD2+1)+'i').attr('src') == 'blank.png') {
        right = true;
        $('#r'+(SQD2)+'c'+(SQD2+1)+'i').attr('src', 'arrowright.png');
    } else {
        right = false;
    }
    if ($('#r'+(SQD2+1)+'c'+(SQD2)+'i').attr('src') == 'blank.png') {
        down = true;
        $('#r'+(SQD2+1)+'c'+(SQD2)+'i').attr('src', 'arrowdown.png');
    } else {
        down = false;
    }
    if ($('#r'+(SQD2)+'c'+(SQD2-1)+'i').attr('src') == 'blank.png') {
        left = true;
        $('#r'+(SQD2)+'c'+(SQD2-1)+'i').attr('src', 'arrowleft.png');
    } else {
        left = false;
    }
    $('#r' + SQD2 + 'c' + SQD2 + 'i').attr('src', 'llama.png');
}

function setLoading(b) {
    if (b) {
        $('#loading').attr('class', 'loading');
    } else {
        $('#loading').attr('class', 'invisible');
    }
}

function generateNewMap() {
    map = new Array(WORLD_SIZE);
    doNotParse = new Array(WORLD_SIZE);
    for (var i = 0; i < WORLD_SIZE; i ++) {
        map[i] = new Array(WORLD_SIZE);
        doNotParse[i] = new Array(WORLD_SIZE);
        for (var i2 = 0; i2 < WORLD_SIZE; i2 ++) {
            map[i][i2] = 'block.png';
            doNotParse[i][i2] = false;
        }
    }
    lX = Math.floor(WORLD_SIZE/2);
    lY = Math.floor(WORLD_SIZE/2);
    map[lX][lY] = 'blank.png';
    genStack = [];
    genStack.push(lX);
    genStack.push(lY);

    //Generating maze
    while (true) {
        dirArr = [];
        if (lX + 1 < WORLD_SIZE && map[lX+1][lY] == 'block.png' && (lX + 2 >= WORLD_SIZE || map[lX+2][lY] == 'block.png') && (lY - 1 < 0 || map[lX+1][lY-1] == 'block.png') &&
            (lY + 1 >= WORLD_SIZE || map[lX+1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([1, 0]);
        }
        if (lX - 1 >= 0 && map[lX-1][lY] == 'block.png' && (lX - 2 < 0 || map[lX-2][lY] == 'block.png') && (lY - 1 < 0 || map[lX-1][lY-1] == 'block.png') &&
            (lY + 1 >= WORLD_SIZE || map[lX-1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([-1, 0]);
        }
        if (lY + 1 < WORLD_SIZE && map[lX][lY+1] == 'block.png' && (lY + 2 >= WORLD_SIZE || map[lX][lY+2] == 'block.png') && (lX + 1 >= WORLD_SIZE || map[lX+1][lY+1] == 'block.png') &&
            (lX - 1 < 0 || map[lX-1][lY+1] == 'block.png')) {
            dirArr = dirArr.concat([0, 1]);
        }
        if (lY - 1 >= 0 && map[lX][lY-1] == 'block.png' && (lY - 2 < 0 || map[lX][lY-2] == 'block.png') && (lX + 1 >= WORLD_SIZE || map[lX+1][lY-1] == 'block.png') &&
            (lX - 1 < 0 || map[lX-1][lY-1] == 'block.png')) {
            dirArr = dirArr.concat([0, -1]);
        }
        if (dirArr.length === 0) {
            lY = genStack.pop();
            lX = genStack.pop();
            if (genStack.length === 0) {
                break;
            }
            continue;
        }
        var index = Math.floor(Math.random() * (dirArr.length / 2));
        lX += dirArr[index*2];
        lY += dirArr[index*2+1];
        map[lX][lY] = 'blank.png';
        genStack.push(lX);
        genStack.push(lY);
    }
    map[lX + SQD2][lY + SQD2] = 'blank.png';
    //End generating maze

    //Generating rooms
    for (var i = 0; i < ROOM_AMOUNT; i ++) {
        tX = Math.floor(Math.random() * WORLD_SIZE);
        tY = Math.floor(Math.random() * WORLD_SIZE);
        tW = Math.floor(Math.random() * ROOM_SIZE);
        tH = Math.floor(Math.random() * ROOM_SIZE);
        for (var i2 = tX - tW; i2 < tX + tW; i2 ++) {
            if (i2 >= 0 && i2 < WORLD_SIZE) {
                for (var i3 = tY - tH; i3 < tY + tH; i3 ++) {
                    if (i3 >= 0 && i3 < WORLD_SIZE) {
                        map[i2][i3] = 'blank.png';
                    }
                }
            }
        }
    }
    //End generating rooms

    //Random blank spots
    for (var i = 0; i < RND_BLANK_AMOUNT; i ++) {
        map[Math.floor(Math.random() * WORLD_SIZE)][Math.floor(Math.random() * WORLD_SIZE)] = 'blank.png';
    }
    //End random blank spots

    //Enemies
        for (var i = 0; i < ENEMY_AMOUNT; i ++) {
        map[Math.floor(Math.random() * WORLD_SIZE)][Math.floor(Math.random() * WORLD_SIZE)] = 'a/a' + Math.floor(Math.random()*30) + '.png';
    }
    //End enemies
}