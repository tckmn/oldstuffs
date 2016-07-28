window.onload = function() {
 n=1
 with ((b=document.body).style) {
    textAlign = 'center'
    fontFamily = 'monospace'
 }
 with ((c=e()).style) {
  fontSize = x(f(10))
  border = '2px solid black'
  borderBottomWidth = x(1)
 }
 b.appendChild(c)
 p('Medium',500,p('Slow',1000).style.borderRightWidth=x(c.innerHTML=0)).style.borderRightWidth=x(0,p('Fast',250,i=setInterval(a,1000)))
}
function p(s,t) {
 var l = o('span')
 l.innerHTML = s
 l.id = 't'+t
 with (l.style) {
  border = '1px solid black'
  fontSize = x(f(20))
  width = x(f(3)-1)
  display = 'inline-block'
 }
 l.onclick = (function(t,l) {
  return function() {
   clearInterval(i)
   i=setInterval(a,t)
   l.style.backgroundColor = '#AAF'
   setTimeout(function(){
    l.style.backgroundColor='#FFF'
   },300)
  }
 })(t,l)
 b.appendChild(l)
 return l
}
function f(s){return b.offsetWidth / s | 0}
function x(s) {return s+'px'}
function a(){c.innerHTML = n++}
function e(){return o('div')}
function o(s){return document.createElement(s)}