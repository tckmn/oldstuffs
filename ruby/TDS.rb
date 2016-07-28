require'curses';include Curses;noecho;curs_set 0
b=0xf3e499e601c0d0240b0380679927cf.to_s(2).tr'01',' #'
s=init_screen<<b.scan(/.{10}/)*$/;s.keypad 1
p=22;d=->t=?@{setpos p/10,p%10;addch t;6};d[]
loop{p=b[v=p+[10,-10,-1,1][getch%d[32]]]<?#?v:p;d[]}