window.onload = function() {
 c = e(), n = 1, b = document.body, w = b.offsetWidth
 with (b.style) {
    textAlign = 'center'
    fontFamily = 'monospace'
 }
 with (c.style) {
  fontSize = x(Math.floor(w / 10))
  border = '2px solid black'
  borderBottomWidth = x(1)
 }
 c.innerHTML = 0
 b.appendChild(c)
 p('Slow',1000).style.borderRightWidth = x(0)
 p('Medium',500).style.borderRightWidth = x(0)
 p('Fast',250)
 i=setInterval(a, 1000)
}
function p(s,t) {
 var l = o('span')
 l.innerHTML = s
 l.id = 't'+t
 with (l.style) {
  border = '1px solid black'
  fontSize = x(Math.floor(w / 20))
  width = x(Math.floor(w / 3) - 1)
  display = 'inline-block'
 }
 l.onclick = (function(t) {
  return function() {
   clearInterval(i)
   i=setInterval(a,t)
  }
 })(t)
 b.appendChild(l)
 return l
}
function x(s) {return s+'px'}
function a(){c.innerHTML = n++}
function e(){return o('div')}
function o(x){return document.createElement(x)}