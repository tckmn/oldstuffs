function inspectString(s) {
    return '"' + s.replace(/"/g, '\\"') + '"'
}

AdventureScript = {
    init: function(code, target) {
        // ignore indentation
        code = code.replace(/\n[ \t]+/g, '\n')

        obj = {}
        var lblFinder = /^\/label (.*)\n((?:(?!\/label)[\s\S])+)/gm, matchedData
        while ((matchedData = lblFinder.exec(code)) != null) obj[matchedData[1]] = matchedData[2].trim()

        AdventureScript.labels = obj
        AdventureScript.target = target
        AdventureScript.path = []
        AdventureScript.gotoLabel('main')
    },
    escape: (function() {
        var ret = {}
        var escapeCodes = {'*': 'a', '#': 'h', '-': 'd', '/': 's', '\\': 'b', '_': 'u'}
        ret.escape = function(x) {
            return escapeCodes[x] || x
        }
        var reverseEscapeCodes = {}
        for (var key in escapeCodes) reverseEscapeCodes[escapeCodes[key]] = key
        ret.unescape = function(x) {
            return reverseEscapeCodes[x] || x
        }
        return ret
    })(),
    render: function(txt) {
        return txt.replace(/\\(.)/g, function(match, toEscape) {
                    return '\\' + AdventureScript.escape.escape(toEscape)
                })
                .replace(/\*\*([^]*?\S[\*]*)\*\*/g, '<b>$1</b>')
                .replace(/\*([^\*]*?\S)\*/g, '<i>$1</i>')
                .replace(/__([^_]*?\S)__/g, '<u>$1</u>')
                .replace(/#(.*?)\n/g, '<h1>$1</h1>')
                .replace(/##(.*?)\n/g, '<h2>$1</h2>')
                .replace(/###(.*?)\n/g, '<h3>$1</h3>')
                .replace(/####(.*?)\n/g, '<h4>$1</h4>')
                .replace(/#####(.*?)\n/g, '<h5>$1</h5>')
                .replace(/######(.*?)\n/g, '<h6>$1</h6>')
                .replace(/\s+---*\s+/g, '<hr />')
                .replace(/^\/path ([^ ]*) (.*?)$/gm, function(match, target, btntxt) {
                    return '<button onclick=\'AdventureScript.gotoLabel(' + (target == 'return' ? 'AdventureScript.pathPop()' : inspectString(target)) + ')\'>' + btntxt + '</button>'
                })
                .replace(/^\/embed (.*)$/gm, function(match, target) {
                    return AdventureScript.render(AdventureScript.labels[target])
                })
                .replace(/^\/null$/gm, '')
                .replace(/\n/g, '<br />')
                .replace(/\\(.)/g, function(match, toUnescape) {
                    return AdventureScript.escape.unescape(toUnescape)
                })
    },
    gotoLabel: function(lblName) {
        AdventureScript.target.innerHTML = AdventureScript.render(AdventureScript.labels[lblName])
        AdventureScript.path.push(lblName)
    },
    pathPop: function() {
        AdventureScript.path.pop() // remove current location
        return AdventureScript.path.pop()
    }
}