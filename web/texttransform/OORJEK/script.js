var t,a,o

window.addEventListener('load', function(e) {
t = document.getElementById('t')
a = true
o = 500
swap()
}, false);

function swap() {
t.innerHTML = a ? 'OOR' : 'JEK'
var r = gRand(), g = gRand(), b = gRand()
t.style.color = colStr(r, g, b)
t.style.backgroundColor = colStr(255-r, 255-g, 255-b)
a = !a
setTimeout(swap, o)
}

function gRand() {
return Math.floor(Math.random() * 255)
}

function colStr(r, g, b) {
return 'rgb(' + r + ',' + g + ',' + b + ')'
}