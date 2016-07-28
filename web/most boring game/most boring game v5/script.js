var n, b, s, m = 0, mn, cont, places = [
            'forest',
            'desert',
            'swamp',
            'marsh',
            'prarie',
            'cave',
            'grassland',
            'tundra',
            'cavern',
            'clearing'
    ]

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10);

function begin() {
    n = document.getElementById('n')
    okbtn = document.getElementById('okbtn')
    atkbtn = document.getElementById('atkbtn')
    dfndbtn = document.getElementById('dfndbtn')
    lbtn = document.getElementById('lbtn')
    rbtn = document.getElementById('rbtn')
    sbtn = document.getElementById('sbtn')
    bbtn = document.getElementById('bbtn')
    mn = document.getElementById('m')
    cont = document.getElementById('cont')
    s = 2
    okbtn.onclick = function () {
        not('You see a creature!')
        hideBtn(okbtn)
        showBtn(atkbtn)
        showBtn(dfndbtn)
    }
    atkbtn.onclick = function () {
        not('You killed the creature! (+1 money)')
        m++
        mn.innerHTML = m + ' money'
        hideBtn(atkbtn)
        hideBtn(dfndbtn)
        showBtn(lbtn)
        showBtn(rbtn)
        showBtn(sbtn)
        showBtn(bbtn)
    }
    dfndbtn.onclick = function () {
        not('The creature attacks you, but you block it!')
    }
    lbtn.onclick = wander
    rbtn.onclick = wander
    sbtn.onclick = wander
    bbtn.onclick = wander
}

function wander() {
    not('You walk into a ' + randPlace() + '!')
    hideBtn(lbtn)
    hideBtn(rbtn)
    hideBtn(sbtn)
    hideBtn(bbtn)
    showBtn(okbtn)
}

function randPlace() {
    return places[Math.floor(Math.random() * places.length)]
}

function not(x) {
    n.innerHTML = x
}

function showBtn(b) {
    b.style.setProperty('display', 'inline')
}

function hideBtn(b) {
    b.style.setProperty('display', 'none')
}