// JS2Q - JavaScript 20 Questions
// Made by OddLlama

var rawData = 'Does it have four legs?\nDoes it have two legs?\ndog10cat10bird01'
var questions = rawData.split('\n')
var data = questions.pop().match(/.+?[0-9]+/g)
var obj = {}
for (var i = 0; i < data.length; i ++) {
    var splitData = data[i].match(/([^01]+)([01]+)/)
    obj[splitData[1]] = splitData[2].split('')
}
