def b(x,i);y=i/x;n=u=1;#a
b=0;loop{c=y/n;break b if
  c==0;         b+=u*c
 y/=x*x;        n+=2;
 u=-u}          ;end#
 n=10;          o=n**
 (200+n)        ;m=4*
 (4*b(5,        o)-b(
  239,o))       ;puts(
  (m/(10        **n))
  .to_s        .insert(
  1,?.))       ;;#*rn1