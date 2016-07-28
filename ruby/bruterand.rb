print 'Input the word you want a code of: '
usrin = gets.chomp
max = 0
min = 999
usrin.each_char { |c|
  max = c.ord > max ? c.ord : max
  min = c.ord < min ? c.ord : min
}
usrin = usrin.split('')
theSeed = -1
mySeed = 0
while true
  myRand = Random.new mySeed
  curChr = 0
  works = false
  while true
    if myRand.rand(min..max).chr != usrin[curChr]
      break
    end
    curChr += 1
    if curChr == usrin.length
      works = true
      break
    end
  end
  if works
    theSeed = mySeed
    break
  else
    mySeed += 1
  end
end
puts "Here is your code: #{theSeed}|#{min}|#{max}|#{usrin.length}"