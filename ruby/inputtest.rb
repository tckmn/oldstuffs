require 'open3'

class Bot
	attr_accessor :cmd, :coords, :old_coords, :old_fight, :score, :data

	def initialize cmd, coords
		@cmd = cmd
		@coords = coords
		@old_coords = coords.dup
		@old_fight = 'N'
		@score = 0
		@data = ''
	end
end

def run_with_input cmd, input
	output = ''
	Open3.popen2(cmd) {|stdin, stdout, t|
		stdin.print input
		stdin.close
		output = stdout.read
	}
	output = (output.split("\n") + [nil, nil, nil]).slice(0...3)
	output[0] ||= '9'
	output[1] ||= 'N'
	output[2] ||= ''
	output[2] = output[2].slice 0, 1024

	output
end

def square_around map, coords
	# +2 to account for padding
	start_coords = coords.map{|x| x-2+2 }
	end_coords = coords.map{|x| x+2+2 }

	row_padding = [['X'] * map.length] * 2
	rows = (row_padding + map + row_padding).slice(start_coords[0]..end_coords[0])

	col_padding = ['X'] * 2
	square = rows.map{|r| (col_padding + r + col_padding).slice(start_coords[1]..end_coords[1]) }

	square
end

def map_with_bots map, bots
	new_map = map.map(&:dup).dup
	bots.each do |bot|
		new_map[bot.coords[0]][bot.coords[1]] = '*'
	end
	new_map
end

def try_move map, bot, move, fight
	move_map = {
		1 => [-1, -1],
		2 => [-1,  0],
		3 => [-1,  1],
		4 => [ 0,  1],
		5 => [ 1,  1],
		6 => [ 1,  0],
		7 => [ 1, -1],
		8 => [ 0, -1],
		9 => [ 0,  0]
	}
	move = move_map[move.to_i]
	m_coords = [bot.coords[0] + move[0], bot.coords[1] + move[1]]

	# move
	bot.old_coords = bot.coords.dup
	if map[m_coords[0]][m_coords[1]] == '#'
		# do nothing
	else
		# move there
		bot.old_fight = fight
		bot.coords[0] = m_coords[0]
		bot.coords[1] = m_coords[1]
	end
end

def do_fights bots
	fights = bots.group_by{|b| b.coords }.map{|k, v| v }.select{|a| a.length == 2 }
	fights.each do |fight|
		if ties(fight[0], fight[1])
			# no-op, let `disambiguate_map` get to it
		elsif wins(fight[0], fight[1])
			# yay
			fight[1].coords = fight[1].old_coords.dup
		else
			# lose
			fight[0].coords = fight[0].old_coords.dup
		end
	end
end

# does `winner` win?
def wins winner, loser
	(winner.old_fight == 'A' && loser.old_fight == 'N') ||
	(winner.old_fight == 'N' && loser.old_fight == 'C') ||
	(winner.old_fight == 'C' && loser.old_fight == 'A')
end

def ties a, b
	a.old_fight == b.old_fight
end

def disambiguate_map bots
	had_to_disambiguate = true
	while had_to_disambiguate
		had_to_disambiguate = false
		p bots.group_by{|b| b.coords }.map{|k, v| v }.select{|a| a.length > 1 }.flatten.uniq
		bots.group_by{|b| b.coords }.map{|k, v| v }.select{|a| a.length > 1 }.flatten.uniq.each do |bot|
			had_to_disambiguate = true
			bot.coords = bot.old_coords.dup
		end
	end
end

def collect_eggs map, bots
	bots.each do |bot|
		if map[bot.coords[0]][bot.coords[1]] == 'o'
			case bot.old_fight
			when 'A'
				map[bot.coords[0]][bot.coords[1]] = ' '
			when 'C'
				bot.coords = bot.old_coords.dup
			when 'N'
				map[bot.coords[0]][bot.coords[1]] = ' '
				bot.score += 1
			end
		end
	end
end

def map_stringify map
	map.map(&:join).join "\n"
end

# for debugging
def print_map map
	puts map_stringify map
end

#############################################################

map = $<.read.split("\n").map{|x| x.split '' }
bots = 'ruby dumbbot.rb
ruby  dumbbot.rb
ruby   dumbbot.rb
ruby    dumbbot.rb
ruby     dumbbot.rb'.split("\n").map {|x|
	coords = nil
	until coords && (map[coords[0]][coords[1]] == ' ')
		coords = [rand(map.length), rand(map.length)]
	end
	Bot.new x, coords
}

print_map map_with_bots(map, bots)
# main loop
(bots.length * 25).times {
	bots.each do |bot|
		output = run_with_input bot.cmd, "#{map_stringify(square_around map_with_bots(map, bots), bot.coords)}\n#{bot.data}"
		bot.data = output[2]
		try_move map, bot, output[0], output[1]
	end
	do_fights bots
	disambiguate_map bots
	collect_eggs map, bots
	print_map map_with_bots(map, bots)
	break unless map.flatten.index 'o'
}
p bots.sort_by{|b| b.score }