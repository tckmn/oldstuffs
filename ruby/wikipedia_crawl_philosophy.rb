require'open-uri'
require'nokogiri'
x="/wiki/"+gets.chomp
r=[n=i=0]
until x=~/\/Philosophy/
d=Nokogiri.HTML open"http://en.wikipedia.org#{x}"
x=d.css('p a').select{|a|t=a.xpath('preceding::text()').map(&:text)*'';t.count('(')==t.count(')')&&a.attr('href')=~/^.wiki[^:]+$/}[i].attr'href'
i=0
#puts r.index(x)?->{$><<'i=';i=($*[0]||gets).to_i;''}[]: r.push(x)[-1][6..-1]
puts r.index(x)?"#{$><<'i=';i=($*[0]||gets).to_i;''}": r.push(x)[-1][6..-1]
n+=1
end
p n