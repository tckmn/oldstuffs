m=[gets.chomp]
a=m[0].scan(/\d/).max.to_i
m[0].gsub!(/./){|n|n==?. ? ' ':a-n.to_i}
s=nil
until a==0
o=''
m[-1].chars{|c|o+=case c
when ?0;?^
when ' ';t=s;s=nil;t ? '':' '
when /\d/;(c.to_i-1).to_s
when ?^;s=1;o.slice! -1;"/ \\"
when ?/;t=s;s=nil;t ? "#{o.slice! -1;' '}":o.slice!(-1)=='\\' ? 'v ':"/ "
when ?\\;s=1;' \\'
when ?v;' '
end}
m.push o
a-=1
end
puts (m[1..-1]*"\n").gsub /\d/,' '