require 'open-uri'
open('http://stackoverflow.com/users/1223693?tab=reputation') do |file|
 file.each_line { |line|
  if line.include? '<span class="count">'; puts ((line.split '>')[1].split '<')[0]; end
 }
end