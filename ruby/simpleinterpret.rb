$funcs = {
    input: ->arg{ print arg; gets.chomp },
    output: ->arg{ puts arg; arg }
}

def pass code
    changed = false
    code.gsub!(/([a-z]+)\("([^"]*)"\)/) { changed = true; "\"#{$funcs[$1.to_sym][$2]}\"" }
    code.gsub!(/"([^"]*)"\+"([^"]*)"/) { changed = true; "\"#{$1 + $2}\"" }
    changed
end

code = 'output("Hi "+input("Enter your name: "))'
nil while pass code