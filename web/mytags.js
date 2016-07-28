if (!localStorage['SOMyTags:favtags']) setup()
var tags = localStorage['SOMyTags:favtags'].split(',')

$('.mainnavs').css('position', 'relative')
var q = $('#nav-questions').parent()
q.css({zIndex: 2, position: 'relative'})
var mt = $('<li><a id="edit" style="font-size: 70%">edit</a><a id="SOMyTags" href="' + url() + '">My tags</a></li>').css({position: 'absolute', zIndex: 1, opacity: '0'})
mt.insertAfter(q)
var h = q.height() + 'px'
q.mouseover(function() {
    mt.animate({
        opacity: '1',
        bottom: h
    })
}).mouseout(function() {
    if (!mt.is(':hover')) mt.animate({
        opacity: '0',
        bottom: '0px'
    })
})
$('#edit').click(function() {
    setup()
    $('#SOMyTags').attr('href', url())
})
function setup(def) {
    localStorage['SOMyTags:favtags'] = prompt('SOMyTags setup: enter your favorite tags (comma separated, no whitespace)', def || localStorage['SOMyTags:favtags'] || 'foo,bar,baz')
}
function url() {
    return 'http://stackoverflow.com/questions/tagged/' + localStorage['SOMyTags:favtags'].replace(/,/g, '+or+')
}