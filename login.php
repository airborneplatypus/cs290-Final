<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//header('Content-type: text/plain');

echo "<html>\n";
echo "<head>\n";
echo "<title> Login </title>\n";
echo "<style>
	h1{
		text-align:center;
		font-family: \"Arial\", Helvetica, sans-serif;
	}";
echo "</head>\n";
echo "<body>\n";
echo "<br>\n";
echo "<br>\n";
echo "<br>\n";
echo "<br>\n";
echo "<br>\n";
/*http://web.engr.oregonstate.edu/~osterbit/2/repo/class-content/form_tests/Formtest.php*/
echo "<img src = \"images/everywhere.jpg\" align=\"middle\"";
echo "<table style=\"margin: auto\">\n";
echo "<tr>\n";
echo "<td>Login Name:</td>\n";
echo "<td><input id=\"username\" type=\"text\"></td>\n";
echo "</tr>\n";
echo "<tr>\n";
echo "<td>Password: </td>\n";
echo "<td><input id=\"password\" type=\"password\" onkeydown=\"if (event.keyCode == 13) document.getElementById('loginBtn').click()\"><button id=\"loginBtn\">Login</button></td>\n";
echo "</tr>\n";
echo "</table>\n";
echo "<br>";
echo "<center>New to this site?  Click <a href=\"createAccount.php\">here</a> to create a new account.</center>";
echo "<script src=\"login.js\"></script>\n";
echo "</body>\n";
echo "</html>\n";
?>