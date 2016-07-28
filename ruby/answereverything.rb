messages = ['Calculating...', 'Processing...', 'Converting...']
puts 'Ask me a question!'
userinput = gets.chomp
10.times do
 puts messages.sample
 sleep rand
end
puts 'The answer to "' + userinput + '" is...: == 42! =='