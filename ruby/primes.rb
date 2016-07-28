def isPrime i
  prime=true
  i=i.to_i
  (2...(Math.sqrt i)).each do |x|
    if i%x==0
      prime=false
      break
    end
  end
  return prime
end

print 'Input key number => '
n=gets.chomp.to_i
print 'Input iteration amount => '
gets.chomp.to_i.times do |x|
  if isPrime(((x+1)*n)-1)
    print((((x+1)*n)-1).to_s + ', ')
  end
end
puts 'and that is all'
gets