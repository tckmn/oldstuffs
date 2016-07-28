var t,a='Llamas are awesome! I am typing very quickly. I am a fast typist! Llamas are awesome. I am a llama trapped inside a human body! Did you know that? Well, I did. Do you know how I am typing this quickly? Well, of course, I am really not. I simply made a JavaScript script for typing quickly. It is awesome! Well, I am running out of things to say. I think I will just repeat what I typed before. I will do that.'.split(' '),i=0

window.addEventListener('load', function(e) {
t=document.getElementById('t')
t.onkeypress = function(e) {
e.preventDefault()
t.value += a[i++%a.length] + ' '
}
}, false);
