pi = Rational(1)
add = false
denominator = 3
number = gets.to_i
number.times do
  pi += Rational(add ? 1 : -1, denominator)
  denominator += 2
  add = !add
end
puts (pi * 4).to_f