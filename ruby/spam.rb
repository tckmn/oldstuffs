require 'net/http'
require 'uri'

begin
postData = Net::HTTP.post_form(URI.parse('http://videogamecheatsultra.com/commentindex.php'), {'name'=>'test'})

puts postData.body
rescue Exception => e
puts e
end

gets