require 'anemone'

Anemone.crawl("http://en.wikipedia.org/") do |anemone|
  anemone.skip_links_like(/\/wiki\/\w+:/)
  anemone.on_every_page do |page|
      pagename = page.url.to_s.scan(/\/wiki\/[^\/]+$/)[0]
      if pagename
        puts pagename.gsub('_', ' ')
      end
  end
end