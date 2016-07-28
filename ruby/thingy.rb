itms = []
puts 'Welcome to LLAMAList! Type a command, or type help for a list of commands.'
while 1
puts '-----'
print '>'
cmd = gets.chomp
case cmd
when 'help'
puts 'Commands: add, add (item), remove, remove (item), list'
when /^add(\s*(.*))/
if $2==''
puts 'What do you want to add?'
print '>'
item = gets.chomp
itms << item
puts 'Added \'' + item + '\'.'
else
itms << $2
puts 'Added \'' + $2 + '\'.'
end
when 'list'
itms.each_with_index do |x, ind|
puts (ind+1).to_s + '.) ' + x
end
else
puts 'That is not a valid command. Type help for a list of commands.'
end
end