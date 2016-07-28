a=gets.split;p (1..a.count(a.shift)).inject:*

a=gets.split;l=a.shift;c=0;a.each_cons(2){|x|c+=1if x==[l,l]};p c