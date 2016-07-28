xs = gets.split.map(&:to_i)
yss = 1.upto(xs.size).flat_map {|n| xs.combination(n).to_a.map{|x| x.reduce :+ } }.sort.uniq

p yss * ?,