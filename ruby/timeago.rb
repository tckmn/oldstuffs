=begin
f=->d{t=Time.new
return"Today"if t==d
y=d.year-t.year
t=Time.new d.year,t.month,t.day
a=((d-t)/86400).ceil
g='from now'
y,a,g=-y,-a,'ago'if y<0||a<0
"#{y} years, #{a/7} weeks, #{a%7} days #{g}"}
=end

f=->d{t=Time.new
a=((d-t)/86400).ceil
g='from now'
a,g=-a,'ago'if a<0
a==0?'Today':"#{a/365} years, #{a%365/7} weeks, #{a%365%7} days #{g}"}