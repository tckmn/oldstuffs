s=$<.read
n=s.index"
"
s=s.split n ?'
':' '
o=s.map{|x|x.ljust(s.map(&:size).max,' ').split''}.transpose.map &:join
puts n ?o.map(&:strip).join(' '):o