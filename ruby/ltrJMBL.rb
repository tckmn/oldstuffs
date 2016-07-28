program = IO.readlines('test.ltj').join
s = []

funcs = {
  # stack manipulation
  clr: ->{ s = [] },
  rev: ->{ s.reverse! },
  mix: ->{ s.shuffle! },
  pop: ->{ s.pop },
  dup: ->{ s.push s[-1] },
  rot: ->{ s.rotate! },
  brt: ->{ s.rotate!(-1) },
  swp: ->{ s[-1], s[-2] = s[-2], s[-1] },
  ovr: ->{ s.push s[-2] },

  # etc
  dmp: ->{
    puts s
  }
}

# numbers
nums = 'zro one two tre fou fiv six svn eit nin ten'.split
nums.each_with_index do |x, i|
  funcs[x.to_sym] = ->{
    s.push i
  }
end

# arithmetic
ops = [:+, :add, :-, :sbt, :*, :mlt, :/, :dvd, :%, :mod,
       :==, :eql, :!=, :neq, :>, :grt, :<, :les, :>=, :gte, :<=, :lte]
Hash[*ops].each_pair do |k, v|
  funcs[v] = ->{
    a, b = s.pop, s.pop
    s.push k.to_proc[b, a].to_i
  }
end