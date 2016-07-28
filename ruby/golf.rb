=begin

Specs:

list - display all pies
count type - say how many of type there are
sell n type - remove n type pies
buy n type - add n type pies
exit - end program

my prog is 427 chars

=end

# alias x puts;p={};while 1do print'> ';case(u=gets.chop.split' ')[0]when'exit';x'The pie store has closed!';exit;when'list';p.each{|k,v|printf"| %-#{p.keys.group_by(&:size).max[0]}s | %-#{[(t=p.values).max.to_s.size,t.min.to_s.size].max}s |\n",k,v};when'count';x p[t=u[1]]||"There is no #{t} pie!";when/sell|buy/;m=(u[0]<?s?1:-1)*u[1].to_i;if p[t=u[2]];x p[t]=p[t]+m;else;x p[t]=m;end;else x"That's not a valid command.";end end

alias x puts
p={}
loop{
print'> '
case(u=gets.chop.split)[0]when'exit'
x'The pie store has closed!'
exit
when'list'
p.each{|k,v|printf"| %-#{p.keys.map(&:size).max}s | %-#{p.map{|e,a|a.to_s.size}.max}s |\n",k,v}
when'count'
x p[t=u[1]]||"There is no #{t} pie!"
when/sell|buy/
m=(u[0]<?s?1:-1)*u[1].to_i
if p[t=u[2]]
x p[t]+=m
else
x p[t]=m
end
else x"That's not a valid command."
end}