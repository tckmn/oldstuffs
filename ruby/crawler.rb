=begin
require 'net/http'

def src host, path = '/'
  begin
    [false, Net::HTTP.get(host, path)]
  rescue Exception => e
    [true, e]
  end
end

def crawl_from host, path = '/', limit = 5
  res = src host, path
  if res[0]
    return [true, res[1]]
  end
  if limit <= 0
    return [true, 'Maximum crawl limit reached']
  end
  # v = "[\\w#{Regexp.escape "-._~:/?#[]@!$&'()*+,;="}]" # valid characters
  v = "[\\w#{Regexp.escape "-._~:?#[]@!$&'()*+,;="}]" # valid characters
  res[1].scan(/http:\/\/(
              (?:#{v}+\.)+
              #{v}+)
              ((?:\/#{v}+)*)/x).each {|x|
    host = x[0]
    path = x[1]
    if path == ''; path = '/'; end
    puts "#{host} ::: #{path}"
    #crawl_from '', '', limit - 1
  }
end

crawl_from 'asdf.com', '/index.html'
=end

require 'rubygems'
require 'nokogiri'
require 'open-uri'

@urls = []
@times = 0
@throttle = 10
def crawl url
  if @times % @throttle == 0
    puts "Crawled #{@times} sites. Crawl #{@throttle} more? (y/n)"
    if gets !~ /^y/i
      puts @urls
      raise Excepton, 'Done crawling'
    end
  end
  doc = Nokogiri::HTML(open(url))
  links = doc.css 'a'
  links.each {|link|
    href = link['href']
    if !href.nil?
      joined = URI.join(url, href)
      if @urls.include? joined
        # no-op (for now)
      else
        @urls.push joined
        @times = @times + 1
        crawl joined
      end
    end
  }
end

crawl 'http://stackoverflow.com'
puts @urls