/*
 *
 * SVG NOTES
 * <svg width="200" height="200" viewBox="0 0 100 100"> - viewBox can be used to zoom in
 * <rect x="60" y="10" rx="10" ry="10" width="30" height="30"/> - rounded corners!
 * <circle cx="25" cy="75" r="20"/> - circles are easy
 * <ellipse cx="75" cy="75" rx="20" ry="5"/> - ellipses are too
 * <line x1="10" x2="50" y1="110" y2="150"/> - umm... too easy
 * <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/> - yay, I can draw now
 * <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/> - polyline that connects last to first automatically
 * <path d="M 20 230 Q 40 205, 50 230 T 90230"/> - ...what
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths?redirectlocale=en-US&redirectslug=SVG%2FTutorial%2FPaths - makes the above ^ much more clear but I
 *   probably won't ever need it, unless I need a pie chart or some other curved thing
 * Can use CSS with 'stroke' and 'fill', :hover works too
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients?redirectlocale=en-US&redirectslug=SVG%2FTutorial%2FGradients - gradients, I really don't care
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns?redirectlocale=en-US&redirectslug=SVG%2FTutorial%2FPatterns - patterns, don't care either
 * <text x="10" y="10">Hello World!</text> - fairly easy. 'text-anchor' can be used for centered text and whatnot
 * <tspan> is very powerful, used inside a <text>, see
 *   https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Texts?redirectlocale=en-US&redirectslug=SVG%2FTutorial%2FTexts for more details
 * <g fill='red'> ... </g> fills everything inside it red
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Transformations - transformations I don't care
 * there is an 'opacity' property! for fading out and stuffses
 * only real browser problems with SVG are IE8 and Android 2.3 (current version is 4.2, so I think I'm fine)
 *
 */

var editor, shapes = [
    [
        [10, 10],
        [10, 290],
        [290, 290],
        [290, 10]
    ],
    [
        [290, 10],
        [290, 290],
        [570, 290],
        [570, 10]
    ]
]
window.onload = function() {
    editor = document.getElementById('editor')
    addEditorListeners()
    initializePolygons()
    showPoints()
}
function initializePolygons() {
    var polyList = []
    for (var i = 0; i < shapes.length; i ++) {
        polyList.push(newPolygon())
    }
    updatePolygons(polyList)
}
function newPolygon() {
    var poly = createElement('polygon')
    editor.appendChild(poly)
    return poly
}
function getPoints() {
    return [].concat.apply([], shapes)
}
var pointGroup, onPoint = false, newShape, makingShape = false, newShapePoint, newSegment = null
function showPoints() {
    pointGroup = createElement('g')
    var points = getPoints(), pointCoords = []
    pointLoop: for (var i = 0; i < points.length; i ++) {
        var x = points[i][0], y = points[i][1]
        for (var pc = 0; pc < pointCoords.length; pc ++) {
            if (pointCoords[pc][0] == x && pointCoords[pc][1] == y) {
                continue pointLoop
            }
        }
        pointCoords.push([x, y])
        var point = newPoint(x, y)

        point.addEventListener('mousedown', (function(point){
            return function(e) {
                e.preventDefault()
                if (e.which === 3) {
                    if (newSegment) {
                        //
                    } else {
                        newSegment = [+point.getAttribute('cx'), +point.getAttribute('cy')]
                    }
                } else if (makingShape) {
                    newShape.push([+point.getAttribute('cx'), +point.getAttribute('cy')])
                    if (newShape.length == 3) {
                        makingShape = false
                        editor.removeChild(newShapePoint)
                        shapes.push(newShape)
                        newPolygon()
                        updatePolygons(editor.getElementsByTagName('polygon'))
                        refreshPoints()
                    }
                } else {
                    oldX = point.getAttribute('cx')
                    oldY = point.getAttribute('cy')
                    window.onmousemove = function(e) {
                        e.preventDefault()
                        point.setAttribute('cx', e.pageX - editor.offsetLeft)
                        point.setAttribute('cy', e.pageY - editor.offsetTop)
                    }
                    window.onmouseup = function(e) {
                        window.onmousemove = null
                        for (var i = 0; i < shapes.length; i ++) {
                            for (var i2 = 0; i2 < shapes[i].length; i2 ++) {
                                var oldPoint = shapes[i][i2], x = point.getAttribute('cx'), y = point.getAttribute('cy')
                                if (oldPoint[0] == oldX && oldPoint[1] == oldY) {
                                    shapes[i][i2] = [x, y]
                                } else if (Math.abs(oldPoint[0] - x) < 5 && Math.abs(oldPoint[1] - y) < 5) {
                                    shapes[i][i2] = [x, y]
                                }
                            }
                        }
                        updatePolygons(editor.getElementsByTagName('polygon'))
                        refreshPoints()
                    }
                }
            }
        })(point), false)
        point.addEventListener('mouseover', (function(point){
            return function() {
                onPoint = true
                point.setAttribute('fill', 'red')
            }
        })(point))
        point.addEventListener('mouseout', (function(point){
            return function() {
                onPoint = false
                point.setAttribute('fill', 'black')
            }
        })(point))

        pointGroup.appendChild(point)
    }
    editor.appendChild(pointGroup)
}
function addEditorListeners() {
    editor.addEventListener('mousedown', function(e) {
        e.preventDefault()
        if (e.which === 3) {
            //
        } else if (!onPoint && !makingShape) {
            var x = e.pageX - editor.offsetLeft, y = e.pageY - editor.offsetTop
            newShape = [[x, y]]
            newShapePoint = newPoint(x, y)
            editor.appendChild(newShapePoint)
            makingShape = true
        }
    })
    editor.addEventListener('contextmenu', function(e) { e.preventDefault() })
}
function hidePoints() {
    editor.removeChild(pointGroup)
}
function refreshPoints() {
    hidePoints()
    showPoints()
}
var colors = 'red orange yellow green blue purple'.split(' ')
function updatePolygons(polygons) {
    for (var i = 0; i < polygons.length; i ++) {
        var str = []
        for (var i2 = 0; i2 < shapes[i].length; i2 ++) {
            str.push(shapes[i][i2].join(' '))
        }
        polygons[i].setAttribute('points', str)
        polygons[i].setAttribute('style', 'fill:' + colors[i % colors.length])
    }
}
function createElement(e) {
    return document.createElementNS('http://www.w3.org/2000/svg', e)
}
function newPoint(x, y) {
    var point = createElement('circle')
    point.setAttribute('cx', x)
    point.setAttribute('cy', y)
    point.setAttribute('r', 5)
    return point
}