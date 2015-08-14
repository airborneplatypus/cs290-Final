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
				<table style="width:100%">
					<tr>
						<td>Request Friend:<input id="newFriend" type="text"><button id="requestBtn">Send Request</button></td>
						<td style="text-align:right"><a href="logout.php">logout</a></td>
					</tr>
				</table>
				<div id="peopleColumn">
				<h4>Friends</h4>
				<ul id="people">
				</ul>
				</div>
				<div id="messagesColumn">
				<h4>Messages</h4>
				<ul id="messages">
				</ul>
				</div>
				<script type="text/javascript" src="messenger.js"></script>
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