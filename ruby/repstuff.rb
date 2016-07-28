#eval'open("data.txt").read.scan(/ (..) +(\d+) .(-?\d+)./).map{|x|x.map &:to_i}.group_by(&:shift).map{|x|puts %w[x accept upvote downvote offensive x x x set\ bounty earn\ bounty x x spam x x x suggested\ edit\ approved][x[0]]+": "+x[1].map(&:'+['last).reduce(:+).to_s}','first)*?,}'][$*[0].to_i]

open("data.txt").read.scan(/(..) +\d+ .(-?\d+)/).group_by(&:shift).map{|x|puts %w[x accept upvote downvote offensive x x x set\ bounty earn\ bounty x x spam x x x suggested\ edit\ approved][x[0].to_i]+": "+x[1].map{|y|y[0].to_i}.reduce(:+).to_s}

# Where's your reputation from?

=begin

## Background

If you go to, for example, http://codegolf.stackexchange.com/reputation (or any other SE site `/reputation`), you will see a breakdown of where your reputation came from. Here's an example from mine on Stack Overflow (a whole day):

     2  14124642 (10)
     2  14132300 (10)
     2  14132300 (10)
     2  14132300 (10)
     2  14132300 (10)
     1  14132869 (2)
     1  14132300 (15)
     3  ******** (-1)   [ I'm not telling you who I downvoted ;) ]
     2  14138574 (10)
     2  14138574 (10)
     2  14138746 (10)
     2  14140825 (10)
     2  14140825 (10)
     2  14140825 (10)
     2  14140825 (10)
     16 14140805 (2)
     2  14140825 (10)
     1  14140825 (15)
     2  14145767 (10)
     2  14145767 (10)
     2  14145767 (10)
     2  14145767 (10)
     1  14145767 (15)
     2  14145767 (10)
     2  14145767 (10)
     2  14145767 [9]
     2  14145767 [0]
     2  14148778 [0]
     2  14148778 [0]
     2  14148778 [0]
     2  14148909 [0]
     1  14148778 [15]
     2  14148909 [0]
     2  14148909 [0]
     1  14148909 [15]
    -- 2013-01-03 rep +277  = 2056

And on codegolf.SE (just an excerpt):

     2     12178 (10)
     2     12177 (5)
     2     12177 (5)
     2     12178 (10)
     2     12177 (5)
    -- 2013-08-01 rep +90   = 379

## Challenge

You must read from a file, called `data.txt`, which will contain the data on `sitename/reputation`, **not including** the first line (`total votes: xxx`) and last block (`** rep today: xx, ** rep this week, etc.`).

You must output where the rep came from, in the format `event: amount`, newline-separated. For example, this is what it looks like for me on Stack Overflow:

    accept: 2891
    upvote: 12881
    downvote: -170
    suggested edit approved: 108

Here are the events shown, and what you should output for them:

    1  accept
    2  upvote
    3  downvote
    4  offensive
    8  set bounty
    9  earn bounty
    12 spam
    16 suggested edit approved

You can test it on your own reputation, or if you want to have a test case, then here's mine (with the IDs blanked out):

=end