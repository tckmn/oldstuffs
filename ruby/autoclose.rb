Shoes.app{button('Close'){exit}
p=para
t=Time.now
animate{u=(t-Time.now).to_i+10
exit if u<0
p.text=' '*u+?<}}