noun = %w[llama potato dog computer human pencil pile\ of\ dirt house crayon notepad mouse rat]
$adj = %w[weird red orange yellow green blue purple brown black dark bright flying happy sad messed\ up giant tiny enormous miniature crazy]
verb = %w[flew\ over ate destroyed jumped\ over drank messed\ up]
$m = 'The '

def addAdj
 while 1 do
  if rand < 0.5
   $m << ($adj.sample + ' ')
  else
   return
  end
 end
end

addAdj
$m += noun.sample + ' ' + verb.sample + ' the '
addAdj
$m += noun.sample + (rand < 0.5 ? '!' : '.')
puts $m