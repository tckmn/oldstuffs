x=2;a=x.coerce(3).join(x.to_s).to_i;a-=107*2
s=a.chr*2;s+=(x='a');s+=(??.ord+46).chr;s+=x
s+=:s.to_s;c=?\ ;s=''+(s+c)+?a;s+=:'re'.to_s

puts s
gets