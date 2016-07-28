#input = STDIN.read
input = "1000x90
2500x80
3000x150
2500x200" # temporary debugging tool

food = 100000

input = input.split.map{|x| x.split('x').map &:to_i }
onlyPersonToFeedWeight = input.sort_by! {|a|
  a[1] # weight of person
}.first[1] # find the lightest weighing person
foodForOnePerson =  ((onlyPersonToFeedWeight - 1) / 20.0 + 1).ceil # EAT = (WEIGHT - 1) / 20 + 1

# you can see where this is going

daysNobodyDied = 0
daysSomeoneDied = 0

# first kill off all these overweight people
daysNobodyDied += 4
food -= foodForOnePerson
daysSomeoneDied += 1 # it's only all but one person in the city, don't worry

# I have a good feeling about this now
# ... I'm evil

loop {
  daysNobodyDied += 4
  food -= foodForOnePerson
  if food >= 0
    daysNobodyDied += 1
  else
    daysSomeoneDied += 1
    break
  end
}

puts "Survived for #{daysNobodyDied} days"
puts "There were #{daysSomeoneDied} days in which someone died"