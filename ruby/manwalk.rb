n,*l=$<.read.split'
'
i=->a{a.split.map &:to_i}
x=y=l.map!{|k|i[k]}
(n=i[n])[-1].times{x=y=0
l[x][y]<1?x+=l[x][y]=1:y+=(l[x][y]=0)+1 while x<n[0]&&y<n[1]}
p x,y