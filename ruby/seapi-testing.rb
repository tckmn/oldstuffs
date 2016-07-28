require 'rubygems' # for gems that I am using
require 'open-uri' # for connecting to SE API
require 'zlib'     # for decoding gzipped SE API response
require 'json'     # for parsing SE API response
require 'nokogiri' # for parsing HTML in SE API response

page = 1
print 'output file (ex. output.txt): '
output = File.open(gets.chomp, ?w)
print 'sitename (_____.stackexchange.com or _____.com): '
sitename = gets.chomp
print 'userid: '
userid = gets.chomp
comments = []
loop {
  url = "http://api.stackexchange.com/2.1/users/#{userid}/comments?page=#{page}&pagesize=100&site=#{sitename}&filter=!*LVwAOGPz9y1mP*P" # TODO add user input
  data = JSON.parse(Zlib::GzipReader.new(open(url)).read)
  comments.concat data['items'].map{|x| Nokogiri.HTML("<body>#{x['body']}</body>").css('body').text}
  puts "Quota remaining: #{data['quota_remaining']}/#{data['quota_max']}"
  break unless data['has_more']
  page += 1
}
words = {}
comments.each do |c|
  comment_words = c.scan(/[A-Za-z0-9'\-]+/)
  comment_words.each do |w|
    w.downcase!
    words[w] ||= 0
    words[w] += 1
  end
end
words = words.sort_by(&:last).reverse

output.puts "comment data for user #{userid} on site #{sitename}
-----
word count in all comments"

words.each do |x|
  output.puts "(#{x[1]}) #{x[0]}"
end

output.puts "-----
that is all so far"
puts 'Output finished'