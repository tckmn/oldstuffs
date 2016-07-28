s=open("http://stackoverflow.com/users/"+gets).read
puts s[/me">(.+)</,1],s[/n">([\d,]+)/,1]