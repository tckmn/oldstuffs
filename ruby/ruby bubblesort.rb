s=gets.scan /\w+/
(z=s.size).times{(0..(z-2)).map{|i|s[i],s[i+1]=s[i+1],s[i]if s[i]>s[i+1]}}
$><<s*?,