<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'/>
        <title>Register</title>
        <link rel='stylesheet' href='/global.css'/>
        <style type='text/css'>
            #form {
                margin: 0 auto;
            }
            .label {
                text-align: right;
            }
        </style>
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
            <p>Welcome to OddLlama Productions! Registering an account is easy; just type in a username and a password! Email is optional, but if you forget your password and you don't use an email, you will not be able to reset it. Enjoy!</p>
            <form method='post' action='registerMessage.php' novalidate>
                <table id='form'>
                    <tbody>
                        <tr>
                            <td class='label'><label for='username'>Username</label></td>
                            <td><input type='text' name='username' id='username'/></td>
                        </tr>
                        <tr>
                            <td class='label'><label for='password'>Password</label></td>
                            <td><input type='password' name='password' id='password'/></td>
                        </tr>
                        <tr>
                            <td class='label'><label for='email'>Email (optional)</label></td>
                            <td><input type='email' name='email' id='email'/></td>
                        </tr>
                        <tr>
                            <td>CAPTCHA</td>
                            <td>
                                <?php
                                    require_once('recaptchalib.php');
                                    $publickey = "6LdkAOMSAAAAAFrKuWqRO3VWd4OOo0ysqWnyKS-w";
                                    echo recaptcha_get_html($publickey);
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><input type='submit' value='Register'/></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div id='license' class='bodyRect'>
            <p>
                site licensed under <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0"><img alt='License: ' src='http://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png'/>Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License</a>. see more details <a href='/license.html'>here</a>.
            </p>
        </div>
    </body>
</html>