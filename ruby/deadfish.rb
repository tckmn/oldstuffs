a=0
loop{$><<'>> '
eval gets.gsub(/./){|c|({i:i='a+=1',x:i,d:'a-=1',s:s='a**=2',k:s,o:o='p a',c:o}[:"#{c}"]||'')+';a=a==-1||a==256?0:a;'}}