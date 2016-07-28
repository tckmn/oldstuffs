=begin

LOWERCASE LETTERS - functions

0123456789 10
abcdefghij k

+-*/%<>=!
lmnopqrst

dup | u
pop | v
rev | w
rot | x
grb | y

z - access library functions
  a - print
  b - newline
  c - get
  d - dump stack

UPPERCASE LETTERS - control flow

A - one letter label name (B...B for multiletter)
C - goto one letter label name (D...D for multiletter)
E - goto label if zero (F...F multi)
G - goto if not zero (H...H multi)
I - return

=end

# do I *really* have to do this? I hate you ruby, I really do
class FalseClass; def to_i; 0 end end
class TrueClass; def to_i; 1 end end

program = gets.chomp
tokens = program.scan(/(
                        [a-yI]          # single character
                      | [ACEGz][a-zA-Z] # two characters
                      | ([BDFH]).+?\2   # multicharacter
                      )/x).map(&:first)
index = 0
stack = []
libLookup = {
  a: ->{ print stack[-1] },
  b: ->{ puts },
  c: ->{ stack.push gets.chomp.to_i },
  d: ->{ print stack * ' ' }
}
funcLookup = {
  t: ->{ stack[-1] = (stack[-1] == 0 ? 1 : 0) },
  u: ->{ stack.push(stack[-1]) },
  v: ->{ stack.pop },
  w: ->{ stack.reverse! },
  x: ->{ stack.rotate! },
  y: ->{}, #TODO stackgrab
  z: ->name{ libLookup[name.to_sym][] },
  A: ->name{}, # do nothing, label
  C: ->name{ index = tokens.index('A' + name) },
  E: ->name{ funcLookup[:C][name] if stack[-1] == 0 },
  G: ->name{ funcLookup[:C][name] if stack[-1] != 0 },
  I: ->{} #TODO return
}

'abcdefghijk'.split('').each_with_index do |cmd, i|
  funcLookup[cmd.to_sym] = ->{
    stack.push i
  }
end

arith = '+-*/%<>'.split('').push('==').map {|x| x.to_sym.to_proc}
'lmnopqrs'.split('').each_with_index do |cmd, i|
  funcLookup[cmd.to_sym] = ->{
    a, b = stack.pop, stack.pop
    stack.push(arith[i][b, a].to_i)
  }
end

while index < tokens.size
  t = tokens[index]
  case t.size
  when 1
    funcLookup[t.to_sym][]
  when 2
    funcLookup[t[0].to_sym][t[1]]
  else
    #TODO multicharacter
  end
  index += 1
end