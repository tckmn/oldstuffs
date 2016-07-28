require'mathn'
x=$*[0].split''
puts (0..x.size).all?{|n|x.rotate(n).join.to_i.prime?}?'circular':'nothing'