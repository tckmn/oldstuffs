def prob1
  val = 0
  for i in 1...1000
    if i % 3 == 0 || i % 5 == 0; val += i; end
  end
  puts val
end

def prob2
  v1 = 1
  v2 = 1
  val = 0
  while true
    tmp = v2; v2 += v1; v1 = tmp
    if v2 > 4000000; break; end
    if v2 % 2 == 0; val += v2; end
  end
  puts val
end

def prob3
  num = 600851475143
  val = -1
  for i in 1..(Math.sqrt num)
    if num % i == 0
      prime = true
      for i2 in 2..(Math.sqrt i)
        if i % i2 == 0
          prime = false
        end
      end
      if prime && i>val; val=i; end
    end
  end
  puts val
end

def prob4
  dig = 999
  val = false
  while !val
    num = (dig.to_s + dig.to_s.reverse).to_f
    999.downto 100 do |x|
      if ((num/x)%1 == 0) && ((num/x).to_i.to_s.size == 3)
        val = num.to_i
      end
    end
    dig -= 1
  end
  puts val
end

def prob5
  valFacs = []
  for i in 2..20
    pFacs = [i]
    oFacs = []
    while oFacs != pFacs
      oFacs = pFacs.map{|x| x+0}
      for i2 in pFacs
        for i3 in 2..(Math.sqrt i2)
          if i2 % i3 == 0
            pFacs.slice!(pFacs.index i2)
            pFacs.push i2 / i3, i3
            break
          end
        end
      end
    end
    for i2 in pFacs
      c = pFacs.count i2
      vc = valFacs.count i2
      pFacs.delete i2
      if vc >= c; next; end
      valFacs.push([i2] * (c - vc))
      valFacs.flatten!
    end
  end
  val = 1
  valFacs.each { |x| val *= x }
  puts val
end

def prob6
  sumSq = 0
  sum = 0
  for i in 1..100
    sum += i
    sumSq += i*i
  end
  puts((sum*sum)-sumSq)
end

def prob7
  primes = [2]
  primeCounter = 1
  n = 3
  while true
    isPrime = true
    for i in primes
      if n % i == 0
        isPrime = false
        break
      end
    end
    if isPrime
      primes.push n
      primeCounter += 1
      if primeCounter == 10001; break; end
    end
    n += 2
  end
  puts n
end

def prob8
  str = "73167176531330624919225119674426574742355349194934
    96983520312774506326239578318016984801869478851843
    85861560789112949495459501737958331952853208805511
    12540698747158523863050715693290963295227443043557
    66896648950445244523161731856403098711121722383113
    62229893423380308135336276614282806444486645238749
    30358907296290491560440772390713810515859307960866
    70172427121883998797908792274921901699720888093776
    65727333001053367881220235421809751254540594752243
    52584907711670556013604839586446706324415722155397
    53697817977846174064955149290862569321978468622482
    83972241375657056057490261407972968652414535100474
    82166370484403199890008895243450658541227588666881
    16427171479924442928230863465674813919123162824586
    17866458359124566529476545682848912883142607690042
    24219022671055626321111109370544217506941658960408
    07198403850962455444362981230987879927244284909188
    84580156166097919133875499200524063689912560717606
    05886116467109405077541002256983155200055935729725
    71636269561882670428252483600823257530420752963450".gsub(/[^\d]/, '')
  gprod = -1
  for i in 1..(str.size - 5)
    prod = 1
    str[i,5].each_char {|x| prod *= (x.to_i)}
    if prod > gprod; gprod = prod; end
  end
  puts gprod
end

def prob9
  for a in 1..1000
    b = a + 1
    c = b + 1
    while c <= 1000
      while c*c < a*a + b*b
        c += 1
      end
      if (a+b+c == 1000) && (c*c == a*a + b*b)
        print a*b*c
      end
      b += 1
    end
  end
end

def prob10
  primes = Array.new(2000000, true)
  for i in 2..(Math.sqrt 2000000)
    if primes[i]
      count = 2
      while true
        primes[i*count] = false
        count += 1
        if i*count >= 2000000; break; end
      end
    end
  end
  sum = 0
  primes.each_with_index do |x,index|
    if x; sum += index; end
  end
  puts sum-1 # 1 is not prime, must account for
end

print 'Which problem number to execute? (1-10) '
eval('prob'+(gets.chomp))