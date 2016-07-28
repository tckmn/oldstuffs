code = [
	'code = [',
	'made by http://keyboardfire.com/',
	']',
	'code.each_with_index do |line, index|',
	'    if index < 1',
	'        puts line',
	'    elsif index == 1',
	'        puts code.map{|s| "    #{39.chr}" + s + "#{39.chr}," }.join("\n").slice 0..-2',
	'    else',
	'        puts line',
	'    end',
	'end'
]
code.each_with_index do |line, index|
	if index < 1
		puts line
	elsif index == 1
		puts code.map{|s| "    #{39.chr}" + s + "#{39.chr}," }.join("\n").slice 0..-2
	else
		puts line
	end
end