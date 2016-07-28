@elapsedTime = 0

def startTimer
  print 'Starting homework! Press enter when done.'
  oldTime = Time.new
  gets
  newTime = Time.new
  @elapsedTime += newTime - oldTime
  puts
  puts 'You did homework for ' + @elapsedTime.to_s + ' seconds. You get ' + (@elapsedTime/2).to_s + ' seconds.'
  print 'Press enter to save time and continue homework, or type anything and press enter to use the time you have received.'
  usrin = gets.chomp
  puts
  if usrin == ''
    startTimer
  else
    targetTime = Time.new + @elapsedTime
    while true
      if (Time.new >= targetTime)
        break
      end
      puts 'You have ' + (targetTime - Time.new).round(3).to_s + ' seconds remaining!'
    end
    startTimer
  end
end

startTimer
