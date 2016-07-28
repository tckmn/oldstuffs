# encode

inputN = '1' + gets.chomp.split('').map{|c|
  String('GTAC'.index c)
}.join
inputN = inputN.to_i 4
# manual conversion to base 64 integer
chars = [*'0'..'9', *'a'..'z', *'A'..'Z', '+', '/']
outputN = ''
while inputN != 0
  outputN = outputN + chars[inputN % 64]
  inputN /= 64
end
puts outputN

# decode

n = 0
outputN = outputN.split ''
while outputN != []
  c = outputN.pop
  n += chars.index(c) * (64 ** outputN.size)
end
puts n.to_s(4).split('').map{|i|
  'GTAC'[i.to_i]
}[1..-1].join