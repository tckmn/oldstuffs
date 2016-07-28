a,b=gets.split.map &:to_i
c=b
[*2..o=b].map{|x|x**a}.map{|x|o=c/=x if c%x==0}until o==b
puts"Entire radical: #{a}rt#{b}
Mixed radical: #{((b/c)**(1.0/a)).round}*#{a}rt#{c}
Real number: #{b**(1.0/a)}"