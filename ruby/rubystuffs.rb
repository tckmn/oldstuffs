=begin

To-do List

- add {stuff}: add it to the list
- remove {stuff}: remove it from the list
- list: show the list
- create {name}: make that list
- delete (name): delete that list
- use {name}: switch to that list
- lists: show the lists
- exit: exit the program

=end

lists = {'General' => []}
list = lists['General']
while true
  print '> '
  usr = gets.chop.split(nil, 2)
  case usr[0]
    when 'add'
      if list.include? usr[1]
        puts 'Item is already in list'
      else
        list.push usr[1]
      end
    when 'remove'
      # first check for an exact match
      if !list.delete usr[1]
        # then check for stuff that begins with it
        case list.count { |x| x.start_with? usr[1] }
        when 1
          list.delete_if { |x| x.start_with? usr[1] }
        when 0
          puts 'No items that match'
        else
          puts 'More than one item matches'
        end
      end
    when 'list'
      puts list
    when 'create'
      if lists.include? usr[1]
        puts 'List already exists'
      else
        lists[usr[1]] = []
      end
    when 'delete'
      lists.delete usr[1] { puts 'List does not exist' }
    when 'use'
      if lists.include? usr[1]
        list = lists[usr[1]]
      else
        puts 'List does not exist'
      end
    when 'lists'
      puts lists.keys
    when 'exit'
      exit
    else
      puts 'Not a valid command'
  end
end