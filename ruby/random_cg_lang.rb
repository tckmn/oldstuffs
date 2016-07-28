s=[0]
o=->c{t=s.pop;s.push s.pop.send(c,t)}
gets.chop.each_char{|c|eval %w[t=s.pop;s.push"#{s.pop}#{t}".to_i s[-1]+=1 s[-1]-=1 o[:*] o[:/] o[:+] o[:-] o[:**] o[:%] s.rotate! s.rotate!(-1) s.push(s[-1]) s.concat(s[-2..-1]) s[-1],s[-2]=s[-2],s[-1] s[-1],s[-2],s[-3],s[-4]=s[-4],s[-3],s[-1],s[-2] s.pop][c.to_i 16]}
p s