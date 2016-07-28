window.onload = function() {

var init = [
    {
        name: 'stuff',
        type: 'button',
        content: 'Do stuff',
        onclick: function() {
            money ++
        },
        disabled: false,
        hidden: false,
        inline: false
    }
]

for (var i = 0; i < init.length; i ++) {
    var obj = init[i]
    switch (obj.type) {
        case 'button':
            var btn = document.createElement('button')
            btn.type = 'button'
            btn.innerHTML = obj.content
            btn.onclick = obj.onclick
            btn.disabled = obj.disabled
            btn.style.display = (obj.hidden ? 'none' : (obj.inline ? 'inline' : 'block'))
            document.body.appendChild(btn)
            window[obj.name] = btn
            break
        default:
            throw new Error(obj.type + ' is not a valid object type (object #' + i + ')')
    }
}

function update(obj, dom) {
    dom
}

function initLbl(txt, inline) {
    var lbl = document.createElement(inline ? 'span' : 'div')
    lbl.innerHTML = txt
    document.body.appendChild(lbl)
    return lbl
}
function initBtn(txt, effect, disabled) {
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.innerHTML = txt
    btn.onclick = effect
    btn.disabled = disabled
    document.body.appendChild(btn)
    return btn
}
function setEnabled(item, enabled) {
    if (item.disabled) item.disabled = !enabled
    else item.className = (enabled ? '' : 'greyed')
    return item
}

} // end onload