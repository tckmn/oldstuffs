arr = []
index = 0

function init(seed) {
    index = 0
    arr[0] = seed
    for (var i = 1; i < 624; i ++) {
        arr[i] = (1812433253 * (arr[i-1] ^ (arr[i-1] >>> 30)) + i) | 0
    }
 }

function getNumber() {
    if (index == 0) generateNumbers()

    var y = arr[index]
    y ^= (y >>> 11)
    y ^= ((y << 7) & 2636928640)
    y ^= ((y << 15) & 4022730752)
    y ^= (y >>> 18)

    index = (index + 1) % 624
    return y
}

function generateNumbers() {
    for (var i = 0; i < 624; i ++) {
        var y = (arr[i] & 0x80000000) + (arr[(i+1) % 624] & 0x7fffffff)
        arr[i] = arr[(i + 397) % 624] ^ (y >>> 1)
        if (y % 2 != 0) arr[i] ^= 2567483615
    }
}

// let's get our seed now from the SE API
var x = new XMLHttpRequest()
x.open('GET', 'http://api.stackexchange.com/2.2/answers?pagesize=10&order=desc&sort=activity&site=stackoverflow&filter=!Sri2UzKb5mTfr.XgjE', false)
x.send(null)
// we've got the answer data, now just add up all the numbers.
// only 4 digits at a time to prevent too big of a number.
var seed = 0
var numbers = x.responseText.match(/\d{0,4}/g)
for (var i = 0; i < numbers.length; i++) seed += +numbers[i]

init(seed)
for (var i = 0; i < 10; i++) console.log(getNumber())