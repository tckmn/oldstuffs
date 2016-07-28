cages = '1 14 15 17 3 7 13 6 20 2 19 21 5 18 8 11 16 9 12 4 10'.split(' ').map &:to_i

# after making a "catch," rearrange the array so that the indeces are correct again
def rearrange cages, index
	cages[index..-1] + cages[0...index]
end

# eat a mouse (om nom nom)
def nom cages, index
	cages.delete_at index
	rearrange cages, index
end

# simulate catching the mice in cages, starting at index
def slaughter_mice cages, index, debug = false
	# start off the slaughter by starting at the index
	cages = rearrange cages, index

	# the eating loop
	loop {
		p cages if debug

		caughtIndex = nil # assume we fail
		cages.each_with_index do |cage, i|
			if cage == i+1 # arrays are 0-indexed
				caughtIndex = i # the cage with the mouse we are going to eat
				break # out of each_with_index
			end
		end

		# did we fail?
		return false unless caughtIndex

		# nope! yay!
		# now eat the mouse
		cages = nom cages, caughtIndex
		puts "nommed #{caughtIndex}" if debug

		# did we eat all of them?
		return true if cages.empty?
	}
end

count = 0
all_cages = 0.upto cages.length-1
all_cages.each do |swapIndex1|
	all_cages.each do |swapIndex2|
		# do the swap
		swappedCages = cages.dup
		swappedCages[swapIndex1], swappedCages[swapIndex2] = swappedCages[swapIndex2], swappedCages[swapIndex1]

		# now try eating
		all_cages.each do |startIndex|
			count += 1
			success = slaughter_mice swappedCages, startIndex

			# did we eat them all?
			if success
				# yay! print the result
				slaughter_mice swappedCages, startIndex, true

				# no need to keep trying
				exit
			end
		end
	end
end
p count

p slaughter_mice [1, 1, 1, 1, 1], 0, true