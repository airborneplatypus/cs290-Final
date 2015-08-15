<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//header('Content-type: text/plain');

echo "<html>\n";
echo "<head>\n";
echo "<style>
	h1{
		text-align:center;
		font-family: \"Arial\", Helvetica, sans-serif;
	}";
echo "<title> Create Account </title>\n";
echo "</head>\n";
echo "<body>\n";
echo "<br>\n";
echo "<br>\n";
echo "<br>\n";
echo "<img src = \"unnamed.jpg\" align=\"middle\"";
/*http://web.engr.oregonstate.edu/~osterbit/2/repo/class-content/form_tests/Formtest.php*/
echo "<center><h4 id=\"Title\">Account Creation</h4></center>\n";
echo "<table id=\"accountTable\" style=\"margin: auto\">\n";
echo "<tr>\n";
echo "<td>Login Name:</td>\n";
echo "<td><input id=\"username\" type=\"text\" id=\"username\"></td>\n";
echo "</tr>\n";
echo "<tr>\n";
echo "<td>Password: </td>\n";
echo "<td><input id=\"password\" type=\"password\"></td>\n";
echo "</tr>\n";
echo "<tr>\n";
echo "<td>Verify Password: </td>\n";
echo "<td><input id=\"vPassword\" type=\"password\"></td>\n";
echo "</tr>\n";
echo "<tr>\n";
echo "<td></td>\n";
echo "<td>\n";
echo "<button id=\"createBtn\">Create Account</button>";
echo "</td>";
echo "</tr>\n";
echo "</table>\n";
echo "<br>";
echo "<script src=\"createAccount.js\"></script>\n";
echo "</body>\n";
echo "</html>\n";
?>