@script = '1223123313233'
parsed = []

module Statement
  DIGIT = 1
  NUMBER = 2
  ARITH = 3
  ARITH_TYPES = {
    1 => :+,
    2 => :-,
    3 => :*,
    4 => :/,
    5 => :%,
    6 => :**,
    7 => :==,
    8 => :!=,
    9 => :>,
    0 => :<
  }
  MANIP = 4
end

module Op
  PUSH = 1
  ARITH = 2
end

def grab
  @script.slice!(0).to_i
end

def grabN n
  value = @script[0, n].to_i
  @script[0, n] = ''
  value
end

while not @script.empty?
  case grab
  when Statement::DIGIT
    parsed.push({
      type: Op::PUSH,
      arg: grab
    })
  when Statement::NUMBER
    parsed.push({
      type: Op::PUSH,
      arg: grabN(grab)
    })
  when Statement::ARITH
    parsed.push({
      type: Op::ARITH,
      arg: Statement::ARITH_TYPES[grab]
    })
  end
end

puts parsed