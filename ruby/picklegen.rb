r = 0
puts Array.new(10){Array.new(10){
	case rand
	when 0..0.025
		r += 1
		r.to_s
	when 0.025..0.2
		'P'
	else
		'.'
	end
}}.map(&:join)