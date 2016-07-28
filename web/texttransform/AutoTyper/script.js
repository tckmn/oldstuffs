var t, w = 'This is an automatic typer. It is odd. Yay! I can make this thing type whatever I want. Pie is good! Llamas are awesome!'.split(''), i = 0, n

window.addEventListener('load', function(e) {
t = document.getElementById('test')
n = setInterval(function() {
t.innerHTML += w[i++]
if (i == w.length) clearInterval(n)
}, 50)
}, false);
