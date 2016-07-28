require 'zlib'
code = 'a,b=gets.to_i,gets.to_i;p a+b'
oldcode = nil
count = -1
until code.inspect.length > 29000; oldcode = code; code = Zlib::deflate code; count += 1; end
File.open(ARGV.shift, 'w') do |f| f.puts oldcode.inspect; end
puts count