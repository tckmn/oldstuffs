var items = [], p = 1, finish = false, intr = setInterval(function() {
    if (p >= 10) finish = true
    $.get('http://api.stackexchange.com/2.2/answers?page=' + (p++) + '&pagesize=100&order=desc&sort=votes&site=codegolf&filter=!*LVwAFZ.YnaK-KS*', function(x) {
        items = items.concat(x.items)
        if (finish) {
            clearInterval(intr)
            onFinish()
        }
    })
}, 500)

function onFinish() {
    var item = items[Math.floor(Math.random() * items.length)]
    document.write(item.body)
}