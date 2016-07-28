require 'open-uri'
require 'cgi'

puts 'Scraping data...'

csv = open('http://data.stackexchange.com/codegolf/csv/214556').read.gsub "\r", ''
programs = csv.scan(/^".*?^"$/m).map{|b|
    code = b.match(/<pre><code>(.*?)<\/code><\/pre>/m)
    next nil if !code
    CGI.unescapeHTML(code[1])
       .gsub(/#[^'"]*?$/, '')
       .gsub(/\s+/, ' ')
       .chomp
       #.gsub(/(')((?:\\.|[^\1])*)\1/) { "#{$1}#{$2.length == 0 ? '' : ($2[0] + ($2.length < 2 ? '' : $2[-1]))}#{$1}" }
}.reject{|b|
    !b || # no code found in post
    b =~ /\A0{2,}/ || # hexdump, probably
    b.size > 200 # too long to be a good reference
}

print 'Sequence lengths (, separated): '
seq_lens = gets.chomp.split(',').map &:to_i

seq_lens.each do |seq_len|
    sequences = {}
    programs.each do |p|
        p.chars.each_cons(seq_len) do |c|
            c = c * ''
            sequences[c] ||= 0
            sequences[c] += 1
        end
    end

    File.open("gsf/#{seq_len}.txt", 'w') { |f|
        f.puts sequences.sort_by{|k, v| v}.reverse.map{|a| "[#{a[1].to_s.rjust(3, '0')}] #{a[0]}"}
    }
    puts "Sequence length #{seq_len} done"
end