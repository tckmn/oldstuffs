require 'open-uri'
require 'json'
require 'zlib'
require 'cgi'

print 'Enter site name (___.com or ___.stackexchange.com): '
sitename = gets.chomp
print 'Enter userid: '
userid = gets.chomp

def badge_list sitename, userid
	data = JSON.parse(Zlib::GzipReader.new(open("http://api.stackexchange.com/2.2/users/#{userid}/badges?pagesize=100&order=desc&max=named&sort=type&site=#{sitename}&filter=!6QqLNijBtCN7O")).read)
	puts "#{data['quota_remaining']}/#{data['quota_max']} quota remaining"
	data['items']
end

$sleepTime = 3
def badge_rank sitename, userid, badgename
	loop { begin
		return open("http://data.stackexchange.com/#{sitename}/csv/214019?BadgeName=#{badgename}&UserId=#{userid}").read.match(/\d+/)[0].to_i
	rescue => e
		p e
		puts "Sleeping for #{$sleepTime} seconds"
		sleep $sleepTime
	end }
end

badge_ranks = []
badges = badge_list(sitename, userid)
badges.each_with_index do |b, i|
	name = CGI.unescapeHTML(b['name'])
	badge_ranks.push({name: name, type: b['rank'], rank: badge_rank(sitename, userid, CGI.escape(name).gsub(' ', '+')) })
	puts "#{((i.to_f / badges.length) * 100).round 2}% done"
end

puts 'Done
-----
'

max_str_len = badge_ranks.map{|b| b[:name].length }.max
badge_ranks = badge_ranks.group_by{|b| b[:type] }.sort_by{|l| %w[gold silver bronze].index l[0] }.map{|l|
	raw_arr = l[1].sort_by{|h| h[:rank].to_i }
	raw_arr.map {|raw| "[#{raw[:type][0].upcase}] #{raw[:name].ljust max_str_len} #{raw[:rank]}" }
}
puts badge_ranks