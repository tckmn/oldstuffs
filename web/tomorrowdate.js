// we all know that OOP == good
function TomorrowManager() {
    // constants == good too
    this.values = {
        ERROR: 1, // value on error
        UNINITIALIZED:  2, // value when not initialized yet
        OK: 0 // desired value
    }
    this.consts = {
        HOURS_IN_DAY: 24,
        MINUTES_IN_HOUR: 60,
        SECONDS_IN_MINUTE: 60,
        MILLISECONDS_IN_SECOND: 1000
    }
    this.value = this.values.UNINITIALIZED
}
TomorrowManager.prototype.setValue = function(num) {
    if (typeof num !== 'number') throw new Error('cannot set value to non-number')
    if (!this.value) this.value = this.values.ERROR // oh noes
    else this.value = num
}
// initialize the value
TomorrowManager.prototype.initialize = function() {
    this.setValue(this.values.OK) // set the value to ONE
    return true // return true for success
}
// get the value
TomorrowManager.prototype.getValue = function() {
    if (this.value == this.values.ERROR) { // if the value is ERROR
        throw new Error('value not initialized')
    } else return this.value // return the value
}
TomorrowManager.prototype.getTomorrow = function() {
    return new Date(new Date().getTime() + this.consts.HOURS_IN_DAY * this.consts.MINUTES_IN_HOUR * this.consts.SECONDS_IN_MINUTE * this.consts.MILLISECONDS_IN_SECOND)
}

function TomorrowManagerFactory() {}
TomorrowManagerFactory.prototype.getTomorrowManager = function() {
    return new TomorrowManager()
}

function getTomorrow() {
    var m = new TomorrowManagerFactory().getTomorrowManager() // make a TomorrowManager
    var success = m.initialize() // initialize the value
    if (success) {
        if (m.getValue() === m.values.OK) {
            return m.getTomorrow()
        } else {
            throw new Error('bad value')
        }
    }
    else {
        // there was an error in the initialization
        var retVal = m.values.ERROR // we will return an error
        delete m // maybe it's corrupted
        throw new Error('corrupted TomorrowManager')
        return retVal // return an error in case the throw didn't work
    }
}

alert(getTomorrow())