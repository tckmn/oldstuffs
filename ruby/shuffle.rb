=begin
VERSION 1 - UNGOLFED
userInput = gets.chomp.split ' '
(userInput.length-1).downto 0 do |i|
  j = (rand * (i + 1)).floor
  tmp = userInput[i]
  userInput[i] = userInput[j]
  userInput[j] = tmp
end
print userInput.join ' '
=end

# minor golfing
# u = gets.chomp.split' ';(u.length-1).downto 0 do|i|j=(rand*(i+1)).floor;u[i],u[j]=u[j],u[i];end;print u.join' '

# more golfing
# ((u=gets.chop.split).length-1).downto(0){|i|j=(rand*(i+1)).floor;u[i],u[j]=u[j],u[i]};$><<u*' '

# fully golfed
((u=gets.split).length-1).downto(0){|i|j=rand(i+1);u[i],u[j]=u[j],u[i]};$><<u*' '