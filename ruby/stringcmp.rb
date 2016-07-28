f=->{gets.gsub(/./,?1)}
a=f[]
b=f[]
d=->e{(Math.log10(e.to_i)+1).floor.to_s}
puts(a==b ? ?s:(c=a.sub(b,''))!=a ? ?a+d[c]:?b+d[b.sub(a,'')])