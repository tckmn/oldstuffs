q=->a{if a[1]
p=a.shift
l=[]
g=[]
a.map{|x|(x>p ?g:l).push x}
q[l]+[p]+q[g]
else
a
end}
$><<q[gets.scan /\w+/]*?,