$.fn.slideshow = function() {
    var slides = this.find('>*'),
        slideCount = slides.length,
        slideNum = parseInt(window.location.hash.slice(1) || '1', 10) - 1,
        currentSlide = $(slides[slideNum])
    slides.hide()
    currentSlide.show('slow')
    var slideshow = {
        next: function() {
            currentSlide.hide('slow')
            ;(currentSlide = $(slides[++slideNum])).show('slow')
            window.location.hash = slideNum + 1
        }, prev: function() {
            currentSlide.hide('slow')
            ;(currentSlide = $(slides[--slideNum])).show('slow')
            window.location.hash = slideNum + 1
        }, gotoSlide: function(n) {
            currentSlide.hide('slow')
            ;(currentSlide = $(slides[slideNum = n])).show('slow')
            window.location.hash = slideNum + 1
        }, hasNext: function() {
            return slideNum < slideCount - 1
        }, hasPrev: function() {
            return slideNum > 0
        }, slideNum: function() {
            return slideNum
        }, slideCount: function() {
            return slideCount
        }, toc: function(onclick) {
            var toc = $('<div>')
            slides.each(function(i) {
                toc.append($('<a>').attr('href', '#' + (i + 1))
                                   .text($(this).data('title'))
                                   .click(function() { onclick(i) }))
            })
            return toc
        }
    }
    return slideshow
}