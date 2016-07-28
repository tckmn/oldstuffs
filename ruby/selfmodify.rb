File.open($0,'r+'){|f|t=f.read
t[0]==?; ? t[0]='' : t=?;+t
f.pos=0
f.write t}