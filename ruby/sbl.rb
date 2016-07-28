=begin

My Language Commands
- push digit: 0-9
- add, subtract, multiply, divide, mod: +-*/%
- less than, greater than, equal, not: <>=!
- label, goto, goto if zero, goto if not zero: :^}{ (usage: :lblname:, ^lblname^, etc)
- duplicate, pop, reverse, rotate, grab: $#~@&
- print, get: .,

=end

program = "12:lbl2:34+++:lbl:^lbl^:.::1234:1234"
tokens = program.scan(/:.*?:|\^.*?\^|./)
# optimize labels to indeces
labels = {}
tokens.each_with_index do |t, i|
  if t[0] == ':'
    labels[t.gsub(':', '')] = i
  end
end
# kill the labels in the tokens array
labels.each_value do |v|
  v = 'test'
end
puts labels