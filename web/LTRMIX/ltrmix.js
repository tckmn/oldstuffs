LTRMIX = {
    parse: function(program) {
        return program.toLowerCase().replace(/[^a-z]/g, '').match(/.{3}/g)
    },
    interpret: function(program) {
        stack = []
        for (var i = 0; i < program.length; i ++) {
            LTRMIX.lookup[program[i]]()
        }
        return stack
    },
    run: function(program) {
        return LTRMIX.interpret(LTRMIX.parse(program))
    },
    lookup: (function() {
       var lookup = {
        //stuff
       }
       numbers = 'zro one two tre fou fiv six svn eit nin ten'.split(' ')
       for (var i = 0; i < numbers.length; i ++) {
        lookup[numbers[i]] = (function(i) {
            return function() {
                stack.push(i)
            }
        })(i)
       }
       return lookup
    })()
}

alert(LTRMIX.run('oneone'))