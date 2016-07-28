a=gets.split.group_by &:size
1.upto(a.max[0]){|i|b=a.assoc i
puts"%-2i|#{b ?(?#*b[1].size):''}"%i}