<?php
session_save_path(dirname("sessions"));
session_start();

if(session_status() == PHP_SESSION_ACTIVE){
	if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == 1){
		?><html>
			<head>
				<title>Messenger</title>
				<meta content=\"\">
				<link rel="stylesheet" href="style.css">
			</head>
			<body>
				<h3>Messenger</h3>
				<div id="peopleColumn">
				<ul id="people">
				</ul>
				</div>
				<div id="messagesColumn">
				<ul id="messages">
				</ul>
				</div>
				<script type="text/javascript" src="messanger.js"></script>
			</body>
		</html>
		<?php
	}
	else{
		header("Refresh:3; URL=login.php");
		echo "<br><br><br><br>";
		echo "<center>You need to log in.  Redirecting to login page...</center>";
	}
}


?>