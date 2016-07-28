var t, any = 'the llama/the potato/it/a random person/someone/a dog/a cat/a hamster/the mouse/the table/a pack of wolves/a fish'.split('/'), th = ['I/he/she'.split('/'), 'ate/flew over/fell on top of/attacked/poked/stared at/touched/ran past/walked past/pet/jumped over/licked/kicked/put glue on'.split('/'), 'me/him/her'.split('/'), 'and then/then/after/so/and/the day before/the day after/an hour after/an hour before'.split('/')], i = 0, len = th.length

window.addEventListener('load', function(e) {
t = document.getElementById('test')
th[0] = th[0].concat(any)
th[2] = th[2].concat(any)
setInterval(function() {
var ta = th[i++%len]
t.innerHTML += ta[Math.floor(Math.random() * ta.length)] + (i%len==3&&Math.random() < 0.5?', ':' ')
}, 250)
}, false);
