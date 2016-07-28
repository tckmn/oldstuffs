usrin = gets.chomp.strip.split /\s+/
print 'Spaces between tags? y/n '
puts '[tag:' + usrin.join(gets.chomp.downcase == 'y' ? '] [tag:' : '][tag:') + ']'