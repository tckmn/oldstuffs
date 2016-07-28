<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'/>
        <title></title>
        <link rel='stylesheet' href='/global.css'/>
    </head>
    <body>
        <div id='navbar'>
            <a href='/'>Home</a>
            <a href='/games.html'>Games</a>
            <a href='/art.html'>Art</a>
            <a href='/music.html'>Music</a>
            <a href='/video.html'>Video</a>
            <a href='/text.html'>Text</a>
            <a href='/other.html'>Other Fun Stuff</a>
            <a href='/misc.html' id='youarehere'>Misc</a>
        </div>
        <div class='bodyRect'>
            <?php
                $db = new mysqli('sql105.byethost4.com', 'b4_11634964', 'cI3oPqn9', 'b4_11634964_db');
                if (mysqli_connect_errno()) {
                    echo("Oh no, the llamas couldn't log in to your account because they couldn't access the database! Please try again later.");
                    exit();
                }
                $stmt = $db->prepare('SELECT password FROM Users WHERE username = ?');
                $stmt->bind_param('s', $_POST['username']);
                if (!($stmt->execute())) {
                    echo("Oh no, the llamas couldn't log in to your account! They ran into an error. Please try again later.");
                    $stmt->close();
                    mysqli_close($db);
                    exit();
                }
                $stmt->bind_result($password);
                $stmt->fetch();
                $stmt->close();
                mysqli_close($db);
                if (crypt($_POST['password'], $password) == $password) {
                    echo("Logged in!");
                } else {
                    echo("Wrong password. Please try again.");
                }
            ?>
        </div>
        <div id='license' class='bodyRect'>
            <p>
                site licensed under <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0"><img alt='License: ' src='http://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png'/>Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License</a>. see more details <a href='/license.html'>here</a>.
            </p>
        </div>
    </body>
</html>