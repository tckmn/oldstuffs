print 'Enter your code: '
code = gets.chomp.split('|')

code.each_index { |x|
  code[x] = code[x].to_i
}
myRand = Random.new code[0]
code[3].times do
  print myRand.rand(code[1]..code[2]).chr
end
