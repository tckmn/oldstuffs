var t, w, h, wh, stys

// better window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10);

function begin() {
    w = window.innerWidth
    h = window.innerHeight
    wh = (w + h) / 2
    stys = ['solid', 'groove', 'inset', 'outset']
    for (var i = 0; i < 10; i++) {
        cont.innerHTML += '<div class="c"></div>'
    }
    t = document.getElementsByClassName('c')
    setInterval(randomize, 3000)
    randomize()
}

function randomize() {
    for (var i = 0; i < t.length; i++) {
        var s = t[i].style
        s.setProperty('background-color', rcol())
        s.setProperty('width', (ri(w / 7) + (w / 17)) + 'px')
        s.setProperty('height', (ri(h / 7) + (h / 17)) + 'px')
        s.setProperty('border-width', ri(wh / 35) + 'px')
        s.setProperty('border-color', rcol())
        s.setProperty('border-style', rbrst())
        s.setProperty('top', ri(h) + 'px')
        s.setProperty('left', ri(w) + 'px')
    }
    document.body.style.setProperty('background-color', rcol())
}

function ri(x) {
    return Math.floor(Math.random() * x)
}

function rcol() {
    return 'rgb(' + ri(255) + ',' + ri(255) + ',' + ri(255) + ')'
}

function rbrst() {
    return stys[ri(stys.length)]
}