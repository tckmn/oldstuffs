=begin

Challenge
=========

make a rpn calc

Code
====

a=[]
gets.each_char{|x|
if x=~/\d/
a=[x.to_i]+a
else
a=[a.shift(2).reduce(&x.to_sym)]+a
end
}
p a

=end

# triangle stuff
=begin

3 1 | 3 2 | 3 3 | 3 4
xxx | xxx | x   |   x
xx  |  xx | xx  |  xx
x   |   x | xxx | xxx

=end

=begin
# ungolfed
inputs = gets.split.map(&:to_i)
size = inputs[0]
spacesFirst = inputs[1] % 2 == 0
longestFirst = inputs[1] < 3

rng = (1..size).to_a
if longestFirst
  rng = rng.reverse
end

for x in rng
  str = 'x' * x
  if spacesFirst
    str = str.rjust(size)
  end
  puts str
end
=end

# golfed
i=gets.split
s=i[0].to_i
(i[1]<?3?s.downto(1):1..s).map{|x|t=?x*x
puts i[1].ord%2<1?t.rjust(s):t}