str = 'llamas'

puts str[-1]
puts str.match(/(.)\z/).first
puts str.reverse.chr
puts str[str.size.pred]
puts str.each_char.reverse_each.next