t=->s{[*s.gsub(?j,?i).upcase.tr('^A-Z','').chars]}
k=t[gets.chomp]
m=t[gets.chomp]
c=k.uniq+([*?A..?Z]-k-['J'])
t=Array.new(5){Array.new(5){c.shift}}
m=[*(m*'').gsub(/(.)\1/){"#{$1}X#{$1}"}.chars]
m=[*(m.size%2<1?m:m+['X']).each_slice(2)]
c=->n{[t.index{|r|k=r.index n},k]}
puts m.map{|p,q|p,q=c[p],c[q]
if p[0]==q[0]
[t[p[0]][(p[1]+1)%5],t[q[0]][(q[1]+1)%5]]
elsif p[1]==q[1]
[t[(p[0]+1)%5][p[1]],t[(q[0]+1)%5][q[1]]]
else
[t[p[0]][q[1]],t[q[0]][p[1]]]
end}*''