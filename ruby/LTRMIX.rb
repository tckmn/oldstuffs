# do I *really* have to do this? I hate you ruby, I really do
class FalseClass; def to_i; 0 end end
class TrueClass; def to_i; 1 end end

program = IO.readlines('test.ltx').join
tokens = program.downcase.gsub(/[^a-z]/, '').scan(/.{3}/).map(&:to_sym)
tki = 0
s = calls = []

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

  # numeric stuffs
  neg: ->{ s[-1] = -s[-1] },
  rcp: ->{ s[-1] = 1 / s[-1] },

  # boolean stuffs
  not: ->{ s.push(s.pop == 0 ? 1 : 0) },

  # flow control
  jmp: ->{
    # TODO: calls.push tki or something so rtn can be used
    # search for the label, and set the index to it (add one to skip past label name)
    tki = tokens.each_cons(2).to_a.index([:lbl, tokens[tki + 1]]) + 1
  },
  jiz: ->{
    if s[-1] == 0
      funcs[:jmp][]
    else
      funcs[:lbl][] # act like a label since we're doing nothing
    end
  },
  jnz: ->{
    if s[-1] != 0
      funcs[:jmp][]
    else
      funcs[:lbl][] # act like a label since we're doing nothing
    end
  },
  lbl: ->{
    # skip past the label name
    tki += 1
  },

  # I/O
  put: ->{ print s[-1] },
  get: ->{ s.push gets.chomp.to_i },
  lin: ->{ puts },
  dmp: ->{ puts s }
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

while tki < tokens.length
  tk = tokens[tki]
  puts tk
  funcs[tk][]
  tki += 1
end
