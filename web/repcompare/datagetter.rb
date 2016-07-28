require 'nokogiri'
require 'open-uri'
require 'json'

def getRepData userId, siteName
	doc = Nokogiri::HTML open("http://stackexchange.com/users/#{userId}?tab=reputation")
	script = doc.css('script').find{|s|s.text.index 'new Highcharts.Chart({'}
	highchartsData = script.text.match(/new Highcharts.Chart\(\{(.*?)\}\);/m)[1]
	series = highchartsData.match(/series:\s*\[(.*)\]/m)[1]
	sites = series.scan(/\{(.*?)\}/m)
	sites.map! {|s|
		s = s[0]
		startDate = s.match(/pointStart:\s*Date\.UTC\((.*?)\)/)[1].split(',').map(&:to_i)
		startDate[1] += 1
		{
			name: s.match(/name:\s*['"](.*?)['"]/)[1],
			data: s.match(/data:\s*\[(.*?)\]/)[1].split(',').map(&:to_i),
			creationDate: Time.new(*startDate, 0, 0, 0, 0)
		}
	}
	data = sites.find{|s|s[:name] == siteName}
	data
end

userIds = [1266491, 178805]
site = 'Programming Puzzles & Code Golf'

data = userIds.map {|u|
	Hash[u, getRepData(u, site)]
}
p data