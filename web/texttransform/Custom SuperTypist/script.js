var t,a,i=0,b

window.addEventListener('load', function(e) {
t=document.getElementById('t')
b=document.getElementById('b')
b.onclick = function() {
a = t.value.split(' ')
t.value = ''
t.onkeypress = function(e) {
e.preventDefault()
t.value += a[i++%a.length] + ' '
}
document.body.removeChild(this)
}
}, false);