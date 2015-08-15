<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//header('Content-type: text/plain');

session_save_path(dirname("sessions"));
session_start();
header("Refresh:2; URL=login.php");

echo "<center>";

if(session_status() == PHP_SESSION_ACTIVE){
    $_SESSION = array();
    session_destroy();
    echo "<br><br><br><br>";
	echo "You are being logged out. ";
}

echo "</center>";

?>