require 'io/console'
a=b=7;n=' ';h=?#;p=h*5;x=10;y=7;u=1;
Thread.new{
while 1
case STDIN.getch
when ?a then a-=1
when ?s then a+=1
when ?k then b-=1
when ?l then b+=1
end
end
}
while 1
if(u)
y-=1
if(y==0)
u=nil
end
else
y+=1
if(y==14)
u=1
end
end
system'cls'
print h,n*a,p,n*(15-a),h
puts
15.times{|i|
if(i==y)
print(h,n*x,'o',n*(19-x),h)
else
print(h,n*20,h)
end
puts
}
print h,n*b,p,n*(15-b),h;sleep 0.1;end