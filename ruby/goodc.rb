gets
s=[]
l=[]
while(g=gets.to_i)>0
s.push g
end
z=2
until l.size>=s.max
a=z.to_s.split''
l.push z if(1..a.size).flat_map{|n|a.each_cons(n).map{|x|x.join.to_i}}.all?{|x|x<1||x%11>0&&x%2<1}
z+=1
end
puts s.map{|x|l[x-1]}