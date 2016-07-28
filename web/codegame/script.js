var data = [["Welcome to the JavaScript code game! Your goal is to get the code to work without any errors.\nHere is a simple start. I have defined an 'assume' function that will make an error if the statement after it is false.\nGood luck!", "var a = @\nassume(a == 5)"], ["Yay! Level 2.", "var a = @\na + 5 == 8"]],
    level = 0

window.onload = function() {
    document.body.appendChild(getLevel(level))
}

function getLevel(lvl) {
    var formEl = document.createElement('form')
    formEl.onsubmit = function(e) {
        e.preventDefault()
        var code = this.children[1], txt = code.innerHTML
        for (var i = 0; i < code.children.length; i++) {
            txt = txt.replace(/<input.*?>/, code.children[i].value)
        }
        console.log(eval(AssumeError.toString() + '\n' + assume.toString() + '\nAssumeError.prototype = Error.prototype\n' + htmlUnescape(txt)))
    }

    var message = document.createElement('p')
    message.innerHTML = data[lvl][0].replace(/\r?\n/g, '<br />')
    formEl.appendChild(message)

    var code = document.createElement('pre')
    code.innerHTML = htmlEscape(data[lvl][1]).replace(/@/g, '<input type="text" onmouseover="this.focus()" />')
    formEl.appendChild(code)

    var submitBtn = document.createElement('input')
    submitBtn.type = 'submit'
    formEl.appendChild(submitBtn)

    return formEl
}

function htmlEscape(txt) {
    return txt.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;')
}

function htmlUnescape(txt) {
    return txt.replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, '\'')
}

function AssumeError(message) {
    this.message = message || 'AssumeError'
    this.name = 'AssumeError'
}

function assume(x) {
    if (!x) throw new AssumeError('Assumed false statement')
}