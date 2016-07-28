require'open-uri'
a,b,c=gets.split.map &:to_i
puts open("http://xkcd.com/#{a}").read.scan(/<div id="ctitle">(.*?)<.*<img src="(.*?)" title="(.*?)"/m)