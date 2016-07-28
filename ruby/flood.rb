a='0 1 0 1 0
0 1 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 1 1 0'.split('
').map(&:split)
f=->x,y{a[x][y]=1
[[-1,0],[1,0],[0,-1],[0,1]].map{|o|d,e=x+o[0],y+o[1]
f[d,e]if a[d]&&a[d][e]==?0}}
f[i=a.index{|x|x.index ?0},a[i].index(?0)]
p !(a.join=~/0/)