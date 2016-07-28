g=gets.split.map(&:to_i).permutation(4)
s=[0,2,4,6]
%w[+ - * /].repeated_permutation(3).map{|x|g.map{|y|s.map{|b|s.select{|e|e>b}.map{|a|y.zip(x).flatten[0..6].join.insert(a+1,?)).insert(b,?()}}}}.flatten.each{|x|begin
puts x if(eval(x)==24)
rescue
end}