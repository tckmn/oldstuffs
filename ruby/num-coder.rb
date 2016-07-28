$chrs = %w[0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z . , ? ! ( ) ' / \  @ # $ % ^ & * : + - =]
$len = $chrs.length
def encode i, iterations
  code = ''
  while i != 0
    code = String($chrs[i % $len]) + code
    i /= $len
  end
  if iterations > 0
    puts "#{iterations} iterations left"
    word = ''
    code.bytes.each do |thing|
      word += ("%03d" % thing).to_s
    end
    code = encode word.to_i, iterations - 1
  end
  code
end

def decode code, iterations
  code.upcase!
  i2 = ''
  for x in 0...code.size
    i2 += code[x] unless ($chrs.index code[x]).nil?
  end
  code = i2
  i = 0
  for x in 0...code.size
    i += ($chrs.index code[x]) * ($len ** ((code.size - 1) - x))
  end
  original = ''
  i2 = i.to_s
  i2 = '0' + i2 if i2.size % 3 != 0
  for num in i2.scan(/.{3}/)
    original += num.to_i.chr
  end
  if iterations > 0
    puts "#{iterations} iterations left"
    original = decode original, iterations - 1
  end
  original
end

while true
  begin
    word = ''
    print 'Encode: '
    gets.chomp.bytes.each do |thing|
      word += ("%03d" % thing).to_s
    end
    print 'Iterations: '
    puts encode word.to_i, gets.chomp.to_i - 1
    print 'Decode: '
    tmp = gets.chomp
    print 'Iterations: '
    puts decode tmp, gets.chomp.to_i - 1
  rescue Exception => e
    puts 'Error'
  end
end