/*
    Welcome to the source code of HTML5 Flamethrower!

    HTML5 Flamethrower is licensed under CC-Wiki (CC-BY-SA).
    http://creativecommons.org/licenses/by-sa/2.5/

    In short, this means that you can use this for
        free as long as you credit me, OddLlama
        Productions. You must also link to my
        website. If you alter the code, you must
        license it under this same license.

    Enjoy!
*/

window.onload = (function() {
    var cnv, ctx
    return function() {
        cnv = document.createElement('canvas')
        cnv.innerHTML = 'Your browser does not support the HTML5 canvas element. Please upgrade to a more modern browser, like the latest version of Google Chrome or Mozilla Firefox.'
        ctx = cnv.getContext('2d')
        cnv.ontouchstart = cnv.ontouchmove = cnv.onmousemove = function(e) {
            e.preventDefault()
        }
    }
})