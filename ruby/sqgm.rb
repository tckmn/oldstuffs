=begin
a=Array.new(7){Array.new(7){rand(9)+1}}
r=[1,3,5]
s=[-1,0,1]
s=s.product s
s.reject!{|x|x==[0,0]}
r.product(r).map{|x|a[x[0]][x[1]]=s.map{|y|a[x[0]+y[0]][x[1]+y[1]]}.reduce(:+)}
a.map{|x|puts x.map{|y|y.to_s.ljust 3}.join}
=end

a=Array.new(7){Array.new(7){rand(9)+1}}
s=[-1,0,1]
s=s.product s
s.slice!4
r=[1,3,5]
r.product(r).map{|x|u=0
s.map{|y|u+=a[x[0]+y[0]][x[1]+y[1]]}
a[x[0]][x[1]]=u}
puts a.map{|x|x.map{|y|y.to_s.ljust 3}.join}