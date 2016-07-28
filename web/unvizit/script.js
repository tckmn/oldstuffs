document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form'),
        query = document.getElementById('query')
    form.onsubmit = function() {
        chrome.history.deleteUrl({url: query.value})
    }
    query.focus()
})