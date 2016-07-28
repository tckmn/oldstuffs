//////////////////////////////////////////////////////////////////////////
//              WELCOME TO THE SOURCE CODE FOR CANVAS GAME!             //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

var c, ct,
    w, a, s, d,
    box = new Image(),
    x = 200, y = 200,
    bw, bh, halfbw, halfbh,
    bspd = 2, rspd = 0.07,
    rot = 0, sCount = 0,
    canSwing = true, tmpAng,
    enemies = new Array()
const PI = 3.14159

$(document).ready(function() {
    c = document.getElementById('gamecanvas')
    ct = c.getContext('2d');
    box.src = 'box.png'
    box.onload = function() {
        bw = box.width; bh = box.height
        halfbw = bw/2; halfbh = bh/2
        setInterval(tick, 30);
    }
    document.onkeydown = function(e) { switch (e.charCode || e.keyCode) {
            case 87: w = true; break
            case 65: a = true; break
            case 83: s = true; break
            case 68: d = true; break
            case 32: if (canSwing && !sCount) sCount = 20; canSwing = false; break
        } };
    document.onkeyup = function(e) { switch (e.charCode || e.keyCode) {
            case 87: w = false; break
            case 65: a = false; break
            case 83: s = false; break
            case 68: d = false; break
            case 32: canSwing = true; break
        } };
});

function drawBox() {
    ct.translate(x, y)
    ct.rotate(rot)
    ct.drawImage(box, -halfbw, -halfbh)
    ct.rotate(-rot)
    ct.translate(-x, -y)
    if (sCount > 0) {
        sCount --
        ct.translate(x, y+halfbh)
        ct.rotate((tmpAng = rot + sCount / 10 - 1) + PI)
        ct.fillRect((halfbh * Math.sin(tmpAng)) + 5 - sCount, (halfbh * Math.cos(tmpAng)) + halfbh, 10, 50)
        ct.rotate(-tmpAng - PI)
        ct.translate(-x, -y-halfbh)
    }
}

function updateAndDrawEnemies() {
    for (var e in enemies) {
        e = enemies[e]
        e.x += (x - e.x) / e.spd * Math.random()
        e.y += (y - e.y) / e.spd * Math.random()
        ct.fillRect(e.x, e.y, e.size, e.size)
    }
}

function tick() {
    ct.clearRect(0, 0, 400, 400)
    if (w) {
        x += bspd * Math.sin(rot)
        y -= bspd * Math.cos(rot)
    }
    if (s) {
        x -= bspd * Math.sin(rot)
        y += bspd * Math.cos(rot)
    }
    if (a) rot -= rspd
    if (d) rot += rspd
    if (Math.random() < 0.01 && enemies.length <= 10) spawnEnemy()
    drawBox()
    updateAndDrawEnemies()
}

function lineIntersect(x1,y1,x2,y2,x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}

function Enemy() {}

function spawnEnemy() {
    var e = new Enemy
    e.x = Math.random() * 1000 - 300
    e.y = Math.random() * 1000 - 300
    e.size = 20
    e.spd = 40
    enemies.push(e)
}