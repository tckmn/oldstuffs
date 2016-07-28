require 'chunky_png'

img = ChunkyPNG::Image.from_file('img.png')
pixels = img.pixels
shades = '.,";-=*&$#'
ascii = pixels.map {|px|
	r, g, b, a = ChunkyPNG::Color.to_truecolor_alpha_bytes px
	a == 0 ? ' ' :
		shades[((r + g + b) / 3.0) / 255 * shades.length]
}.each_slice(img.width).map(&:join).join "\n#"

File.open('ascii.txt', 'w') {|f| f.puts ascii }