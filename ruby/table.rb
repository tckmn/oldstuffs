=begin

r=red
o=orange
y=yellow
g=green
b=blue
p=purple

=end

$><<'<table>'+gets.chop.split(',').map{|r|'<tr>'+r.split('').map{|t|"<td style='background:#{%w[red orange yellow green blue purple].select{|x|x[0]==t}[0]}' width=50 height=50></td>"}.join('')+'</tr>'}.join('')+'</table>'