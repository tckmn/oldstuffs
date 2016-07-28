arena = '###############..........;..............#..........;..............#..........;..............#..........;..............#..........;...........1###..........;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;.........................;...................###...;...................#.##..;2..................#..#..;#..................##.#..;#...................#.###;....................#####'

# we're considering the enemy a wall, for simplicity.
# no need to weight him any more than the other walls because he will
# always be surrounded by walls anyway.
arena = arena.sub(?2, ?#).split(?;)

# pad the arena with extra walls (edges of the arena)
searchRadius = 7
arenaSize = arena.first.size

verticalEdgeWalls = [?# * arenaSize] * searchRadius
arena = verticalEdgeWalls + arena + verticalEdgeWalls

horizontalEdgeWalls = ?# * searchRadius
arena.map! {|row| (horizontalEdgeWalls + row + horizontalEdgeWalls).split('') }

# now get the area around the bot
botRow = arena.index{|row| row.index ?1 }
botCol = arena[botRow].index ?1

searchZone = arena.slice(botRow-searchRadius..botRow+searchRadius)
searchZone.map! {|row| row.slice(botCol-searchRadius..botCol+searchRadius) }

# second to last step: assign values to each square depending on how far away they are
# from the player (Manhattan distance)
# this is so that the player avoids running directly into a wall; higher value means closer tile
# 0123210
# 1234321
# 2345432
# 1234321
# 0123210
centerSquare = searchRadius
searchZone = searchZone.each_with_index.map {|row, rowIndex| row.each_with_index.map{|tile, tileIndex|
    [tile, searchRadius*2 - ((rowIndex - centerSquare).abs + (tileIndex - centerSquare).abs)]
} }
puts searchZone.map{|x|x.map{|y|y[1].to_s.rjust(2, ?0)}.join ' '} * "\n"

# finally, assign weights to each direction
# first, create a map of directions. each direction has an array, the first element being
# what rows to slice and the second being what column.
sBeg = 0
sMdl = searchRadius
sEnd = searchRadius*2
directions = {
    ?N => [sBeg..sMdl-1, sBeg..sEnd],
    ?E => [sBeg..sEnd, sMdl+1..sEnd],
    ?S => [sMdl+1..sEnd, sBeg..sEnd],
    ?W => [sBeg..sEnd, sBeg..sMdl-1]
}
# then, create another hash of weights
weights = directions.map{|dir, arr|
    section = searchZone.slice(arr[0]).map{|x| x.slice(arr[1]) }.flatten(1)
    [dir, (section.select{|tile| tile[0] == ?# }.map{|tile| tile[1] }.reduce(:+) || 0)] # return the sum of the values of the walls in the area
}
p weights
# yay! we have our weights! now just find the smallest one...
dirToGo = weights.min_by{|_, walls| walls }
# and output!
print dirToGo[0]