def getPrime;print'Enter a number: ';prime=true;badnum=0;i=gets.chomp.to_i;p=' ('
(2...(Math.sqrt i)).each do|x|if i% x==0 then prime=false;badnum=x;break;end;end;
puts prime ? 'Prime!':'Divisible by '+badnum.to_s+p+(i/badnum).to_s+')';gets;end;

def repeatPrime;print'Enter a number: ';prime=true;badnum=Math.sin 0;i=gets.chomp.to_i;
(2...(Math.sqrt i)).each do|x|if i% x==0 then prime=false;badnum=+x;break;end;end;puts(
prime ? 'Prime!':'Divisible by '+badnum.to_s+' ('+(i/badnum).to_s+')');repeatPrime;end;

getPrime
repeatPrime