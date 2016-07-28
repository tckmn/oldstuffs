//////////////////////////////////////////////////////////////////////////
//    WELCOME TO THE SOURCE CODE FOR LLAMA EXPLORATION GAME'S A-STAR!   //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

// NOTE: main game code is in the file "gamescript.js"

//the a-star algorithm
var aStarTime
function aStar(targetX, targetY) {
    var openList = [new aStarSquare(4, 4, -1, -1, 0, pythag(4, 4, targetX, targetY))],
        closedList = [], returnList = []
    aStarTime = 0
    for (var i = -4; i <= 4; i ++) {
        for (var i2 = -4; i2 <= 4; i2 ++) {
            if (!(isWalkable(map[lX+i][lY+i2]))) {
                closedList.push(new aStarSquare(i+4, i2+4))
            }
        }
    }

    //setup is done!

    while (true) {
        aStarTime ++
        var curSq = openList[0], cSqCost = curSq.costFromStart + curSq.costToEnd
        for (var i = 0; i < openList.length; i ++) {
            var t = openList[i], tCost = t.costFromStart + t.costToEnd
            if ((tCost < cSqCost) || (tCost == cSqCost && t.cTime > curSq.cTime)) {
                curSq = t
                cSqCost = tCost
            }
        }
        openList.splice(arrIndexOf(openList, curSq), 1)
        closedList.push(curSq)
        returnList.push(curSq)
        var adjSquares = [] //getting adjacent squares
        if (curSq.x != 0) {
            adjSquares.push(new aStarSquare(curSq.x-1, curSq.y, curSq.x, curSq.y, curSq.costFromStart+1, pythag(curSq.x-1, curSq.y, targetX, targetY)))
        }
        if (curSq.y != 0) {
            adjSquares.push(new aStarSquare(curSq.x, curSq.y-1, curSq.x, curSq.y, curSq.costFromStart+1, pythag(curSq.x, curSq.y-1, targetX, targetY)))
        }
        if (curSq.x != 8) {
            adjSquares.push(new aStarSquare(curSq.x+1, curSq.y, curSq.x, curSq.y, curSq.costFromStart+1, pythag(curSq.x+1, curSq.y, targetX, targetY)))
        }
        if (curSq.y != 8) {
            adjSquares.push(new aStarSquare(curSq.x, curSq.y+1, curSq.x, curSq.y, curSq.costFromStart+1, pythag(curSq.x, curSq.y+1, targetX, targetY)))
        }
        for (var i = 0; i < adjSquares.length; i ++) {
            var t = adjSquares[i]
            if (sqInList(closedList, t) != -1) {
                //can ignore the square
            } else if (sqInList(openList, t) != -1) {
                //update the score if better
                var newScore = t.costFromStart + t.costToEnd
                var oldSq = openList[sqInList(openList, t)]
                if (newScore < oldSq.costFromStart + oldSq.costToEnd) {
                    openList[sqInList(openList, t)].costFromStart = t.costFromStart
                    openList[sqInList(openList, t)].costToEnd = t.costToEnd
                }
            } else {
                if (t.x == targetX && t.y == targetY) {
                    closedList.push(t)
                    returnList.push(t)
                    var finished = [returnList[returnList.length-1]] //to return
                    while (true) {
                        var t = finished[0]
                        var pnt = returnList[sqInList(returnList, new aStarSquare(t.parentX, t.parentY))]
                        finished.splice(0, 0, pnt)
                        if (pnt.x == 4 && pnt.y == 4) break
                    }
                    return finished
                } else {
                    openList.push(t)
                }
            }
        }
    }

}

//square used in the a-star algorithm
function aStarSquare(xLoc, yLoc, pX, pY, sCost, eCost) {
    this.x = xLoc
    this.y = yLoc
    this.parentX = pX
    this.parentY = pY
    this.costFromStart = sCost
    this.costToEnd = eCost
    this.cTime = aStarTime
}

function isWalkable(str) {
    return str == 'blank.png'
}

//distance between two points
function pythag(sX, sY, eX, eY) {
    return Math.sqrt((sX - eX)*(sX - eX) + (sY - eY)*(sY - eY))
}

function sqInList(list, t) {
    var i = list.length
    while (i--) {
        if (list[i].x === t.x && list[i].y === t.y) return i
    }
    return -1
}