var m = 0
function game() {
    alert('You find a creature! You attack it.')
    alert('You killed it! (+1 money)')
    m++
    alert('You have ' + m + ' money.')
}
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
        begin()
        clearInterval(readyStateCheckInterval)
    }
}, 10);
function begin() {
    document.getElementById('b').onclick = game
    game()
}