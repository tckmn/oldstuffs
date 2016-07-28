require 'rubygems'
require 'faye/websocket'
require 'eventmachine'
require 'json'

puts 'starting eventmachine'
EM.run {
ws = Faye::WebSocket::Client.new('ws://sockets.ny.stackexchange.com')

ws.on :open do |event|
  puts 'websocket opened'
  (1..600).each{|n| ws.send("#{n}-questions-active") unless [1,2,3,4,459,41,45,53,248,65,69,73,79,447,485,104,537,120,528,536,512,153,74,423,324,514,471,496,502,415,49,320,435,162,240,277,431,106,367,253,212,61,504,308,228,108,91,42,281,312,202,85,89,102,110,118,122,126,131,135,147,151,156,200,220,232,139,174,182,186,295,196,273,387,93,97,34].include?(n) } # 155 = stackexchange
  puts 'websocket data sent'
end

ws.on :message do |event|
  msg = JSON.parse event.data
  data = JSON.parse msg['data']
  n = msg['action'].match(/\d+/)[0].to_i
  puts "#{data['siteid'] ? "***#{data['siteid']}***\007: " : ''}#{data['body'] ? data['body'].match(/<a href="\/questions\/\d+\/([\w\d-]+)/)[1] : data['titleEncodedFancy']}"
  puts data['siteBaseHostAddress'] if data['siteBaseHostAddress']
end
}