window.addEventListener('load', function(e) {
var st = document.getElementById('test').style
setTimeout(function(){
st.setProperty('opacity', 100); st.setProperty('width', '100%');
st.setProperty('-webkit-transform', 'rotate(10deg) scale(0.8) translate(20px,100px) skewX(-30deg)');
st.setProperty('box-shadow', '5px 5px 5px black');
st.setProperty('font-size', '50px');
st.setProperty('background-color', '#F00');
}, 1000)
}, false);
