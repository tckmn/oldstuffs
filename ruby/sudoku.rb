def list
  puts 'Valid commands: ' + @cmds.join(', ')
end

def solve
  board = '534678912r672 95348r198342567r859761423r426853791r713924856r961537284r287419635r345286179'.split('r').map {|x| x.split('')}
  puts 'Board: '
  board.each do |x|
    puts x.join ' '
  end

end

@cmds = ['list', 'solve']

while true
  print 'Enter a command. Enter "list" to see a list of all valid commands. '
  usrin = gets.chomp
  if (@cmds.include? usrin)
    eval(usrin)
  else
    puts 'Not a valid command.'
  end
  puts
end