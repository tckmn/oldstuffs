class S
def initialize
@a=[]
end
def u n
@a[@a.size]=n
end
def o
@a.slice! -1
end
def s
@a.slice!0
end
def j x
@a*x
end
end

s = S.new
s.u 5
s.u 10
s.u 'test'
s.u 'test2'
puts s.s
puts s.o
puts s.j ?,