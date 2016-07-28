var t, a='po.ta.to.! '.split('.'), len, i = 0

window.addEventListener('load', function(e) {
t = document.getElementById('test')
len = a.length
setInterval(function() {
t.innerHTML += a[i++%len]
}, 500)
}, false);
