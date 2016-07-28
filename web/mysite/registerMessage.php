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
                require_once('recaptchalib.php');
                $resp = recaptcha_check_answer ("6LdkAOMSAAAAANZBB5477EJfD2XhZNNacubO27Vs",
                                                $_SERVER["REMOTE_ADDR"],
                                                $_POST["recaptcha_challenge_field"],
                                                $_POST["recaptcha_response_field"]);
                if ($resp->is_valid) {
                    $db = new mysqli('sql105.byethost4.com', 'b4_11634964', 'cI3oPqn9', 'b4_11634964_db');
                    if (mysqli_connect_errno()) {
                        echo("Oh no, the llamas couldn't create your account because they couldn't access the database! Please try again later.");
                        exit();
                    }
                    $stmt = $db->prepare('INSERT INTO Users VALUES (0, ?, ?, ?)');
                    $stmt->bind_param('sss', $_POST['username'], crypt($_POST['password']), $_POST['email']);
                    if (!($stmt->execute())) {
                        echo("Oh no, the llamas couldn't create your account! Perhaps your username is already taken, please try a different username.");
                        $stmt->close();
                        mysqli_close($db);
                        exit();
                    }
                    $stmt->close();
                    mysqli_close($db);
                    echo("Account created!");
                } else {
                    echo("Oops! You didn't enter the CAPTCHA correctly. Llamas have to enter CAPTHCAs correctly, otherwise they can't make accounts. Please go back and try again.");
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