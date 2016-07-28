input = $<.read
data = input.split("\n")[5]
dir = data.to_i + 1
dir = 1 if dir == 9
puts "#{dir}
N
#{dir}"