require'Prime'
(4..1/0.0).step(2){|x|p=Prime.take x
p x if p.product(p).all?{|y|y[0]+y[1]!=x}}