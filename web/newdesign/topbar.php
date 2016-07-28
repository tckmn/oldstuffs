<?php


echo "<div id='topbar'>
    <div id='topbarLeft'>
        <a href='/' id='logoLink'><img id='logo' src='logo.png' alt='OddLlama Productions'/></a>
        <div class='clearfix'></div>
        <div id='account'>
            You are not logged in. <a href='/login'>Log&nbsp;in</a> | <a href='/register'>Register</a>
        </div>
    </div>
    <div id='topbarRight'>
        <h1 id='title'>" . $title . "</h1>
        <p id='description'>" . $desc . "</p>
    </div>
    <div class='clearfix'></div>
    <div id='navigation'>
        <a href='/games'>Fun & Games</a>
        <a href='/media'>Media</a>
        <a href='/text'>Text</a>
        <a href='/about'>About</a>
    </div>
</div>
<div class='clearfix'></div>";

?>