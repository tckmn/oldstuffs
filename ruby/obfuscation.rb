# This is the original code to print however many letters of "pie is good" the user wants.
# It is pretty understandable. It has some comments.

class Version1
  def self.exec
    print 'How many letters of "pie is good" do you want to print? '
    letters = 'pie is good '.split('')
    usrin = gets.chomp.to_i # input of how many chars to print
    counter = -1 # it gets added to immediately, so it starts at -1
    while (counter += 1) < usrin
      print letters[counter % letters.length] # so that counter doesn't overflow
    end
  end
end

# I started to do some obfuscation. Whitespace is preserved (to be removed later),
# and obfuscation has been commented.

class Version2
  def self.exec
    letters = 'pie is good' # I use this twice
    print "How many letters of \"#{letters}\" do you want to print? "
    letters = (letters + ' ').split(letters.partition('split')[1]) # Then I alter letters back to original
    # Also note the odd partition trick to get an empty string (it returns the word and empty strings if no match)
    usrin = gets.chomp.to_i
    counter = letters[1] <=> letters[0] # Another trick that compares 'i' and 'p', returns -1 ('p' > 'i')
    while (counter += 1) < usrin
      print letters[counter % letters.length]
    end
  end
end

# Even more obfuscation! Still not too hard to understand, obfuscation commented.

class Version3
  def self.exec
    print "How many letters of \"#{letters = 'pie is good'}\" do you want to print? "
    # tricky defining letters inside of letters literal
    (letters += ' ').split(letters.partition('split')[m = 1]) # uses +=, also defines magic number for later
    usrin = gets.chomp.to_i
    counter = letters[m] <=> letters[0] # uses magic number
    m *= counter ** 2 # basiaclly does nothing (multiply by 1)
    while (counter += m) < usrin # more magic number
      print letters[counter % letters.length]
    end
  end
end

# I think I went a bit crazy this time

class Version4
  def self.exec
    oddstring = "MAN(x) MAN of ".sub(reg = /[[:upper:]]{2,}/){|s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr).sub(reg){|s|'letters'}
    # I have no comment on the above. I created it and now I never want to see it again.
    print oddstring + "\"#{letters = 'pie is good'}\" do you want to be shown? "
    (letters += ' ').split(letters.partition(oddstring)[m = 1]) # use oddstring again for max confusion
    usrin = gets.chomp.to_i+oddstring.to_i # add 0
    m *= (counter = letters[m] <=> letters[0]) ** 2 # combined magic number and counter
    while (counter += m) < usrin; print letters[counter % letters.length]; end #single line
  end
end

# More obfuscation, renamed some vars, lots (and I mean LOTS) of whitespace removed.

class Version5
  def self.exec
    print((_="MAN(x) MAN of ".sub(r=/[[:upper:]]{2,}/){|s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr).sub(r){|s|'letters'})+"\"#{l='pie is good'}\" do you want to be shown? ")
    # This is just massive
    (l+=' ').split(l.partition(_)[m=1]);u=gets.chomp.to_i+_.to_i;m*=(c=l[m]<=>l[0])**2;while(c+=m)<u;print l[c%l.length];end
    # This is pretty bad as well
  end
end

# Basically just made it less line length

class Version6
  def self.exec
    print((_="MAN(x) MAN of ".sub(r=/[[:upper:]]{2,}/){|s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr).sub(r){
    |s|'letters'})+"\"#{l='pie is good'}\" do you want to be shown? ");(l+=' ').split(l.partition(_)[m=1]);u=0#
    u+=gets.chomp.to_i+_.to_i;m*=(c=l[m]<=>l[0])**2;while(c+=m)<u;print l[c%l.length];end
  end
end

# Even less lines

class Version6LessLineLength
  def self.exec
    print((_="MAN(x) MAN of ".sub(r=/[[:upper:]]{2,}/){
    |s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr)
    .sub(r){|s|'letters'})+"\"#{l='pie is good'}\" do"+
    " you want to be shown? ");(l+=' ').split(l.partition(_)[m=1])
    u=gets.chomp.to_i+_.to_i;m*=(c=l[m]<=>l[0])**2
    while(c+=m)<u;print l[c%l.length];end
  end
end

# cleanup of line lengths

class Version7
  def self.exec
    print((_="MAN(x) MAN of ".sub(r=/[[:upper:]]{2,}/){#MAN#
    |s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr).sub(r){
    |s|'letters'})+"\"#{l='pie is good'}\" do you want to "+
    "be shown? ");(l+=' ').split(l.partition(_)[m=1]);_.next
    u=gets.chomp.to_i+_.to_i;m*=(c=l[m]<=>l[0])**2;while(c+=
    m)<u;print l[c%l.length];end;gets
  end
end

# fin

class Obfus
  def self.execPlain
    print 'How many letters of "pie is good" do you want to print? '
    letters = 'pie is good '.split('')
    usrin = gets.chomp.to_i
    counter = -1
    while (counter += 1) < usrin
      print letters[counter % letters.length]
    end
  end
  def self.execObfus
    print((_="MAN(x) MAN of ".sub(r=/[[:upper:]]{2,}/){#MAN#
    |s|'How '+s.swapcase}.sub(/\((.)\)/,(11**2).chr).sub(r){
    |s|'letters'})+"\"#{l='pie is good'}\" do you want to "+
    "be shown? ");(l+=' ').split(l.partition(_)[m=1]);_.next
    u=gets.chomp.to_i+_.to_i;m*=(c=l[m]<=>l[0])**2;while(c+=
    m)<u;print l[c%l.length];end;gets
  end
end

Obfus.execPlain
Obfus.execObfus