/*
Particles:
[0]: x
[1]: y
[2]: xv
[3]: yv
[4]: xvv
[5]: yvv
[6]: life
[7]: f
*/

s=[];r=Math.random;z=(b=confirm("Big mode?"))?100:50;j="fillStyle";window.onload=function(){c.height=h=400;c.width=w=600;setInterval(function(){a[j]="rgba(0,0,0,0.1)";a.fillRect(0,0,w,h);for(i=0;i<s.length;i++)p=s[i],u=p[0]+=p[2]+=p[4],v=p[1]+=p[3]+=p[5],0>(x=p[6]-=.05)?s.splice(i--,1):(g=a.createRadialGradient(u,v,0,u,v,z),g[t="addColorStop"](0,p[7]+x+")"),g[t](1,"transparent"),a[j]=g,a.fillRect(u-z,v-z,2*z,2*z));for(i=0;i++<(b?5:7);)s.push([r()*w,h+z,0,-20*r(),r()/4-.125,r(),1,"rgba("+[255,255*r()|0,20*r()|0]+","])},50)}