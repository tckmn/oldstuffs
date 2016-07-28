f=->{c=[]
while (s=gets.chomp)!=''
c.push s
end
c.map{|x|x.split ''}}
a=f[]
b=f[]
f=->c{(d=[*0...c.length]).map{|x|d.combination x}.to_a.map(&:to_a).flatten(1).delete_if(&:empty?)}
g=->c{f[c].product f[c[0]]}
