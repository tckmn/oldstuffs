def esc chr
  '\\[]'.index(chr) ? "\\#{chr}" : chr
end

def reverse_regex str
  ords = str.chars.to_a.uniq.map(&:ord).sort
  prev = ords.first
  ranges = ords.slice_before{|x|
    prev, prev2 = x, prev
    prev2 + 1 != x
  }.map{|x| x[0]..x[-1]}

  reversed = "[#{ranges.map{|c|esc(c.min.chr) + (c.min == c.max ? '' : (c.min + 1 == c.max ? '' : '-') + esc(c.max.chr))}*''}]{#{str.size}}"
  reversed.size > str.size * 3 ? /#{Regexp.escape str}/ : /#{reversed}/
end

p reverse_regex 'dogs are delicious'