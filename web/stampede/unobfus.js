/**.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*/
//////////////////////////////////////////////////////////////////////////
//             WELCOME TO THE SOURCE CODE FOR LLAMA STAMPEDE!           //
//     YOU MAY USE THIS CODE WHEREVER YOU WANT AS LONG AS YOU FOLLOW    //
// THE ATTRIBUTION RULES AT HTTP://WWW.ODDLLAMA.CU.CC/ATTRIBUTION.HTML. //
//                               ENJOY!                                 //
//////////////////////////////////////////////////////////////////////////

/* NOTE: This code was thrown together very quickly. It is not very good
   quality and I should probably improve it, but I'm too lazy. :)       */

/**.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*-*.*/

// fixing indexOf for IE8 / less
// adapted from http://stackoverflow.com/questions/3629183/why-doesnt-indexof-work-on-an-array-ie8
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt) {
        var len = this.length >>> 0
        var from = 0
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from
        }
        return -1
    }
}

var cont, llamas = new Array()
window.onload = function() {
    cont = document.getElementById('cont')
    setInterval(function() {
        if (Math.random() < 0.1) {
            var newLlama = document.createElement('img')
            newLlama.src = 'llama.png'
            newLlama.style.left = '-43px'
            newLlama.style.top = (Math.random() * (window.innerHeight - 80))+'px'
            llamas.push(newLlama)
            cont.appendChild(newLlama)
        }
        for (var i = 0; i < llamas.length; i ++) {
            var newX = (parseInt(llamas[i].style.left.replace('px',''))+5)
            if (newX > window.innerWidth) {
                cont.removeChild(llamas[i])
                llamas.splice(llamas.indexOf(llamas[i]), 1)
                continue
            }
            llamas[i].style.left = newX+'px'
        }
    }, 10)
}