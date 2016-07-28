=begin
def backtickify str, comment = false
  return "`#{str.gsub '`', '\\\\`'}`" if comment
  c = 1
  c += 1 while str =~ /([^`]|\A)#{?` * c}([^`]|\z)/
  str = ' ' + str + ' ' if str[0] == ?` || str[-1] == ?`
  return ?` * c + str + ?` * c
end
=end

s=gets.chop
c=1
c+=1while s=~/([^`]|\A)#{?`*c}([^`]|\z)/
puts ?`+s.gsub('`','\\\\`')+'`
'+?`*c+(s=~/$`|`^/?" #{s} ":s)+?`*c