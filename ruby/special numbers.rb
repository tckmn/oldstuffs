def isPrime i
  prime=true
  badnum=0
  i=i.to_i
  (2...(Math.sqrt i)).each do|x|
    if i% x==0 then prime=false
      badnum=x
      break
    end
  end
  return prime, badnum
end

#100.times do |x|
  #print x.to_s + ':' + isPrime(x)[1].to_s + ', ' if not isPrime(x)[0]
#end
#NOTE: these lines are for listing composite numbers and what they divide by

begin

for x in ((gets.chomp.to_i)..(gets.chomp.to_i))
  print x.to_s + ', ' if x.to_s == x.to_s.reverse and isPrime(x)[0]
end
puts 'and that\'s all'

rescue Exception => e

puts e
puts e.backtrace

end

gets