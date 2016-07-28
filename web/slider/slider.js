function slider(params) {
    var wrapper = document.createElement('div')

    var bar = document.createElement('div'),
        height = params.height || 5
    bar.style.width = '100%'
    bar.style.height = height + 'px'
    bar.style.border = '1px solid black'
    wrapper.appendChild(bar)

    var handle = document.createElement('div'),
        handleSize = params.handleHeight || 20,
        handleMoving = false
    handle.style.width = handle.style.height = handleSize + 'px'
    handle.style.position = 'relative'
    handle.style.top = - Math.floor(handleSize / 2) - Math.floor(height / 2) + 'px'
    handle.style.backgroundColor = 'black'
    handle.onmousedown = function(e) {
        e.preventDefault()
        handleMoving = true
    }
    var oldMouseUp = window.onmouseup || function(){}
    window.onmouseup = function(e) {
        handleMoving = false
        oldMouseUp()
    }
    var oldMouseMove = window.onmousemove || function(){}
    window.onmousemove = function(e) {
        if (handleMoving) {
            handle.style.left = (e.pageX - bar.offsetLeft - handleSize / 2) + 'px'
        }
        oldMouseMove()
    }
    wrapper.appendChild(handle)

    return wrapper
}