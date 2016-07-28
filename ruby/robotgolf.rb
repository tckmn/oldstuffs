d=Array.new(5){[rand(-179..180),rand(0..500)]}
puts"Data: #{d.map{|x,y|"#{x}:#{y}"}.join ?,}"
x,y,a=[0]*3
d.map{|o,d|a+=o
b=a*Math::PI/180
x+=Math.sin(b)*d
y+=Math.cos(b)*d}
puts "Heading: #{Math.atan(y/x)/Math::PI*-180+90}
Distance: #{Math.sqrt(x*x+y*y)}
Orientation: #{a}"