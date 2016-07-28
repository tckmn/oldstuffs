require 'open-uri'
puts 'Getting list of words from Internet...'
file = open('http://www.calvin.edu/~rpruim/scrabble/ospd3.txt').read
puts 'Interpreting words...'
words = file.split("\n")
while 1
puts words.sample
end