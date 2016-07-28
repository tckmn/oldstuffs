p [true,false].repeated_permutation(10).to_a.map {|x|
  n = 1
  x.each {|y|
    if y
      n *= 3
    else
      n /= 2
    end
  }
  [n, x]
}.sort_by(&:first)