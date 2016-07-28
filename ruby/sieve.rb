t = Time.now
(a=[*2..n=1e6]).each{|p|next if !p
break if p*p>n
(p*p).step(n,p){|m|a[m]=nil}}
puts a.compact
puts Time.now - t