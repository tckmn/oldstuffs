//////////////////////////////////////////////////////////////////////////
//              WELCOME TO THE SOURCE CODE FOR CANVAS GAME!             //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

var c, ct, w, a, s, d, box = new Image(), x = 0, y = 0

$(document).ready(function() {
    c = document.getElementById('gamecanvas')
    ct = c.getContext('2d');
    box.src = 'box.png'
    document.onkeydown = function(e) {
        var code = e.charCode || e.keyCode
        switch (code) {
            case 87:
                w = true;
                break
            case 65:
                a = true;
                break
            case 83:
                s = true;
                break
            case 68:
                d = true;
                break
        }
    };
    document.onkeyup = function(e) {
        var code = e.charCode || e.keyCode
        switch (code) {
            case 87:
                w = false;
                break
            case 65:
                a = false;
                break
            case 83:
                s = false;
                break
            case 68:
                d = false;
                break
        }
    };
    box.onload = function() {
        setInterval(tick, 10);
        drawBox()
    }
});

function drawBox() {
    ct.drawImage(box, x, y)
}

function tick() {
    if (w) y --
    if (a) x --
    if (s) y ++
    if (d) x ++
    drawBox()
}