var p="http://i.stack.imgur.com/"
function t(e,b,a,c,f,g){e=$("<div />").css({width:c,height:f,backgroundImage:"url("+p+e+")",position:"absolute",top:a,left:b,display:"none"}).appendTo("body");return g||e.fadeIn(),e.set=function(a){this.css("background-position","0px "+-f*a+"px")},e.finish=function(a){this.fadeOut(function(){$(this).remove();a&&a()})},e}
function kick(e){(function(){d=!0;var b=e.offset(),a=t("1Fba1.png",b.left-100,b.top-40,151,100),c=0,f=setInterval(function(){a.set(c++);11==c&&e.css({position:"relative"}).animate({left:400,top:-100},1E3,"linear").animate({left:600,top:50},500,"linear").animate({left:0,top:0},1500,"linear",function(){d=!1});20==c&&(clearInterval(f),a.finish())},150)})()}
function kiss(e){(function(){d=!0;var b=e.offset(),a=t("1XY5D.png",b.left-100,b.top-50,172,100),c=0,f=setInterval(function(){a.set(c++);20==c&&(clearInterval(f),a.finish(function(){d=!1}))},100)})()}
function thumbsup(e){(function(){d=!0;var b=e.offset(),a=t("cMyYU.png",b.left,b.top+50,80,120),c=0,f=setInterval(function(){a.set(c++);20==c&&(clearInterval(f),setTimeout(function(){a.finish(function(){d=!1})},2E3))},100)})()}
function balloon(e){(function(){d=!0;var b=e.offset(),a=t("4q8j8.png",b.left-60,b.top-80,120,101),c=0,f=setInterval(function(){a.set(c++);a.css("left",b.left-60-c);20==c&&(clearInterval(f),setTimeout(function(){a.finish(function(){d=!1})},2E3))},100)})()}
function sad(e){(function(){d=!0;var b=e.offset(),a=t("cBop8.png",b.left-50,b.top-20,125,150),c=0,f=setInterval(function(){c++;var b=c%18;9<b&&(b=17-b);a.set(b);40==c&&(clearInterval(f),a.finish(function(){d=!1}))},100)})()}
function dance(e){(function(){d=!0;var b=e.offset(),a=t("tjvfW.png",b.left-130,b.top-20,120,117),c=0,f=setInterval(function(){c++;var b=c%29;14<b&&(b=29-b);a.set(b);80==c&&(clearInterval(f),a.finish(function(){d=!1}))},100)})()}
function hornsaber(e){var b=parseInt(e.css("font-size"));(function(){d=!0;var a=e.offset(),c=t("lyX66.png",a.left-80,a.top-40,120,109),f=0,g=setInterval(function(){f++;var a=f-3;19<a&&(a=18-(a-20)%8,15>a&&(a=30-a));13==f&&e.animate({fontSize:0});c.set(Math.max(0,a));40==f&&(clearInterval(g),e.animate({"font-size":b},1E3),c.finish(function(){d=!1}))},150)})()}
function impale(e){(function(){d=!0;e.css({position:"relative"});var b=e.offset(),a=$(window).width()-140,c=t("xBS3c.png",a,b.top-20,140,102),f=0,g=setInterval(function(){f++;a-=20;a<b.left+30&&e.css("left",a-b.left-30);c.set(f%15);c.css("left",a);-140>a&&(clearInterval(g),setTimeout(function(){e.hide().css("left",0).fadeIn("slow")},2E3),c.finish(function(){d=!1}))},50)})()}
function horntoss(e){(function(){d=!0;var b=e.offset(),a=t("RXgxY.png",b.left+300,b.top-130,100,114),c=0,f=setInterval(function(){a.set(c++);18==c&&(horn=t("RXgxY.png",b.left+290,b.top-40,15,12,!0),horn.set(159),horn.show().animate({left:b.left+30,top:b.top+15},700,"linear"));20==c&&(clearInterval(f),setTimeout(function(){a.finish();horn.finish(function(){d=!1})},2E3))},100)})()};

var funcs = {
    Kick: 'kick',
    Kiss: 'kiss',
    'Thumbs Up': 'thumbsup',
    Balloon: 'balloon',
    Sad: 'sad',
    Dance: 'dance',
    HornSaber: 'hornsaber',
    Impale: 'impale',
    'Horn Toss': 'horntoss'
}

$('.post-signature').each(function() {
    var $select = $('<select>')
    for (var f in funcs) $select.append($('<option value="' + funcs[f] + '">').text(f))
    $select.on('change', function(e) {
        window[$(this).find('option:selected').val()]($(this).closest('.post-signature'))
    })
    $(this).append($select)
})

/*var upvote = [kiss, thumbsup, balloon, dance]
var downvote = [kick, sad, hornsaber, impale, horntoss]
$('body').on('click', '.vote-up-off.vote-up-on:not', function(e){ upvote[Math.random() * upvote.length | 0]($(this).siblings('.vote-count-post')) })
$('body').on('click', '.vote-down-off.vote-down-on:not', function(e){ downvote[Math.random() * downvote.length | 0]($(this).siblings('.vote-count-post')) })*/