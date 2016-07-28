var t, any = 'Frodo/Merry/Pippin/Sam/Gandalf/Boromir/Legolas/Gimli/Aragorn/Saruman/Sauron/Gollum/some orcs/Thèoden/an ent/a hobbit/Faramir/Thorin/Glóin/Óin/Bombur/Fili/Kili/a dwarf/an elf'.split('/'), th = [[], 'ate/flew over/fell on top of/attacked/poked/stared at/touched/ran past/walked past/pet/jumped over/licked/kicked/put glue on'.split('/'), [], 'and then/then/after/so/and/the day before/the day after/an hour after/an hour before'.split('/')], i = 0, len = th.length

window.addEventListener('load', function(e) {
t = document.getElementById('test')
th[0] = th[0].concat(any)
th[2] = th[2].concat(any)
setInterval(function() {
var ta = th[i++%len]
t.innerHTML += ta[Math.floor(Math.random() * ta.length)] + (i%len==3&&Math.random() < 0.5?', ':' ')
}, 25)
}, false);
