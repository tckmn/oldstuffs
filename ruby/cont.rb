=begin
n,d=eval gets
while d!=0
puts n/d
n,d=d,n%d
end
=end

n,d=eval gets
a=[]
n,d=d,n%d,a.push(n/d)while d!=0
i=0
j=2*a.size-3
k=a.size-2
a.map{|x|puts' '*i+"#{x}+"+' '*k+?1
i+=2
k-=1
puts' '*i+?-*j
j-=2}rescue 0
puts' '*i+a.last.to_s