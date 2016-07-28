def calc(one=1000000)
  begin
  k = 1
  a_k = one
  a_sum = one
  b_sum = 0
  c3_over_24 = (640320**3 / 24).floor
  while true
    a_k *= -(6*k-5)*(2*k-1)*(6*k-1)
    a_k /= k*k*k*c3_over_24
    a_k = a_k.floor
    a_sum += a_k
    b_sum += k * a_k
    k += 1
    if a_k == 0 then break end
    total = 13591409*a_sum + 545140134*b_sum
    pi = (426880*sqrt(10005*one, one)*one) / total
    return pi.floor
  end
  rescue Exception => e
    puts e
    puts e.backtrace
  end
end

puts calc
gets