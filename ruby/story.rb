@noun = %w[llama cat dog potato book mouse car umbrella helicopter]
@plnoun = %w[llamas cats dogs potatoes books mice cars umbrellas helicopters]
@adj = %w[weird orange invisible big red fuzzy small green circular bouncy]
@verb = %w[eats ate punches punched pokes poked jumps\ over jumped\ over licks licked]
@plverb = %w[eat ate punch punched poke poked jump\ over jumped\ over lick licked]
@quant = %w[the a my this that]
@plquant = %w[the my these those all some no lots\ of many a\ few several]
@endmark = %w[! . ?]
@joiner = %w[,\ and ,\ so ,\ but]

def obj pl
  q, n = pl ? [@quant.sample, @noun.sample] : [@plquant.sample, @plnoun.sample]
  [q].concat(Array.new(rand 3){ @adj.sample }).concat([n]) * ' '
end

def sent
  pl = rand(2) < 1
  [obj(pl), pl ? @verb.sample : @plverb.sample, obj(pl)] * ' '
end

def sents n
  Array.new(n) { rand(2) < 1 ? sent + @endmark.sample : sent + @joiner.sample } * ' '
end

def fixedsents n
  sents(n).gsub(/(?:[!.?] |\A)[a-z]/) {|x| x[0...-1] + x[-1].upcase}.sub(/, \w+\z/, @endmark.sample).gsub(/ a (?=[aeiou])/, ' an ')
end

puts fixedsents(10)