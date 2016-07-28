require'open-uri'
require'zlib'
i=b=0
d=''
until /"has_more":f/=~d
i+=1
d=Zlib::GzipReader.new(open("http://api.stackexchange.com/2.2/questions/featured?site=stackoverflow&page=#{i}&pagesize=100")).read
b+=d.scan(/"bounty_amount":(\d+)/).map{|x|x[0].to_i}.reduce :+
end
p b