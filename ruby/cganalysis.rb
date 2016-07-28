require 'open-uri'
require 'json'
require 'zlib'

page = 1
userdata = []
loop {
	url = "http://api.stackexchange.com/2.2/users?page=#{page}&pagesize=100&order=desc&sort=reputation&site=codegolf&filter=!-.x6ppEpzm6x"
	data = JSON.parse(Zlib::GzipReader.new(open(url)).read)
	userdata.concat data["items"]
	puts "#{data["quota_remaining"]}/#{data["quota_max"]} quota left"
	break unless data["has_more"]
	sleep data["backoff"] + 1 if data["backoff"] # just in case
	page += 1
}

def usersAbove userdata, rep, totalusers
	count = userdata.count{|u| u["reputation"] >= rep}
	puts "#{count} users above #{rep} rep (#{(count.to_f / totalusers * 100).round 5}%)"
end

totalusers = userdata.length
puts "#{totalusers} total users"
[20000, 10000, 5000, 3000, 2000, 1000, 500, 250].each{|r| usersAbove userdata, r, totalusers}