var n, b, s, m = 0

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10);

function begin() {
    n = document.getElementById('n')
    b = document.getElementById('b')
    s = 2
    b.onclick = function () {
        s++
        switch (s) {
            case 1:
                not('You killed the creature! (+1 money)')
                btn('Yay!')
                m++
                break;
            case 2:
                not('You have ' + m + ' money.')
                btn('Ok')
                break;
            case 3:
                not('You see a creature!')
                btn('Attack')
                s = 0
        }
    }
}

function not(x) {
    n.innerHTML = x
}

function btn(x) {
    b.innerHTML = x
}