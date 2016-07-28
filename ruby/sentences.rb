def article
  return %w[the a].sample
end

def adj
  r = ''
  while (rand < 0.3)
    r += %w[big small red green blue].sample + ' '
  end
  return r
end

def noun
  return %w[dog cat llama pie frog potato stick].sample
end

def obj
  return [article, adj + noun].join ' '
end

def verb
  return %w[hit flew\ over poked].sample
end

def aloneVerb
  return %w[flew died fell\ over jumped].sample
end

def clause
  return (rand < 0.5 ? [obj, verb, obj] : [obj, aloneVerb]).join ' '
end

def conj
  return ', but after before , so'.split(/(?<!,) /).map{|x| x.start_with?(',') ? x : ' ' + x}.sample
end

def punc
  return %w[. ! ?].sample
end

def sentence
  r = clause
  while (rand < 0.5)
    r = [r + conj, clause].join ' '
  end
  return r.capitalize + punc
end

while true
  puts sentence
  sleep 0.5
end
