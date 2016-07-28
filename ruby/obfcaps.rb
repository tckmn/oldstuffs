i=gets.to_i
a=[x=y=1]
a+=[y=x+x=y]until y>i
$><<(1..a.size).flat_map{|n|a.combination(n).select{|o|o.inject(:+)==i}}.map{|o|o*?+}*'

'