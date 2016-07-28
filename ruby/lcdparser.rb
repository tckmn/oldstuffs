n=1
s=("    _  _     _  _  _  _  _  _ \n"+
   "  | _| _||_||_ |_   ||_||_|| |\n"+
   "  ||_  _|  | _||_|  ||_|  ||_|").split("\n").map{|x|[*x.split('').each_slice(n+2)]}.transpose.map(&:join)
p s