=begin
target = '  '
loop {
    seed = 0
    puts target + ' ' + loop {
        r = Random.new(seed)
        str = Array.new(target.length) { r.rand(32..126).chr } * ''
        break seed if str == target
        seed += 1
    }.to_s
    t1i = target[1].ord + 1
    if t1i > 126
        target[0] = (target[0].ord + 1).chr
        target[1] = ' '
    else
        target[1] = t1i.chr
    end
}
=end
target = ' '
h = {}
loop {
    seed = 0
    h[target] = loop {
        r = Random.new(seed)
        str = Array.new(target.length) { r.rand(32..126).chr } * ''
        break seed if str == target
        seed += 1
    }
    break if target == '~'
    target = (target.ord + 1).chr
}
p h

# {" "=>48, "!"=>28, "\""=>164, "#"=>82, "$"=>22, "%"=>36, "&"=>109, "'"=>47, "("=>100, ")"=>10, "*"=>6, "+"=>101, ","=>333, "-"=>320, "."=>163, "/"=>17, "0"=>249, "1"=>197, "2"=>61, "3"=>27, "4"=>33, "5"=>142, "6"=>73, "7"=>108, "8"=>3, "9"=>11, ":"=>122, ";"=>146, "<"=>52, "="=>158, ">"=>74, "?"=>135, "@"=>85, "A"=>34, "B"=>24, "C"=>58, "D"=>199, "E"=>1, "F"=>134, "G"=>120, "H"=>2, "I"=>16, "J"=>18, "K"=>112, "L"=>0, "M"=>71, "N"=>4, "O"=>7, "P"=>50, "Q"=>59, "R"=>91, "S"=>42, "T"=>155, "U"=>26, "V"=>69, "W"=>232, "X"=>323, "Y"=>51, "Z"=>132, "["=>94, "\\"=>144, "]"=>46, "^"=>107, "_"=>68, "`"=>41, "a"=>167, "b"=>119, "c"=>8, "d"=>43, "e"=>54, "f"=>40, "g"=>192, "h"=>15, "i"=>21, "j"=>114, "k"=>12, "l"=>221, "m"=>55, "n"=>5, "o"=>57, "p"=>117, "q"=>300, "r"=>13, "s"=>23, "t"=>96, "u"=>29,"v"=>147, "w"=>32, "x"=>14, "y"=>181, "z"=>20, "{"=>90, "|"=>9, "}"=>19, "~"=>131}