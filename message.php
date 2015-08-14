<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbhost = 'oniddb.cws.oregonstate.edu';
$dbname = 'koistint-db';
$dbuser = 'koistint-db';
$dbpass = '48W7fqmF2hJOtdFA';

$mysqli_handle = mysqli_connect($dbhost, $dbuser, $dbpass)
	or die("Error connecting to database server");

mysqli_select_db($mysqli_handle, $dbname)
	or die("Error selecting database: $dbname");

//echo 'Successfully connected to database!';
session_save_path(dirname("sessions"));
session_start();

if(session_status() == PHP_SESSION_ACTIVE){
	function idToName($id, $mysqli_handle){
		$stmt = $mysqli_handle->prepare("SELECT name FROM cs290FinalUsers WHERE id = ?");
		$stmt->bind_param("s", $id);

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			$response = [];
			$row = $result->fetch_array(MYSQLI_NUM);
			$name = $row[0];
			return $name;
		}
		else {
			return NULL;
		}
	}
	$post_request = json_decode(file_get_contents('php://input'));
	$now = new DateTime();
	if($post_request->function == "login"){
		$stmt = $mysqli_handle->prepare("SELECT * FROM cs290FinalUsers WHERE name = ?");
		$stmt->bind_param("s", $post_request->username);

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			$response = [];
			$row = $result->fetch_array(MYSQLI_NUM);
			if(password_verify($post_request->password, $row[2])){
				$_SESSION["loggedIn"] = 1;
				$_SESSION["id"] = $row[0];
				$_SESSION["name"] = $row[1];
				$_SESSION["password"] = $row[2];
				echo "success";
			}
			else{
				echo "Invalid username or password.";
			}
		}
		else {
			echo "Invalid username or password.";// . $mysqli_handle->error// . " " . mysqli_errno($mysqli_handle)
		}
	}
	elseif ($post_request->function == "addUser") {
		$password = password_hash($post_request->password, PASSWORD_DEFAULT);
		$stmt = $mysqli_handle->prepare("INSERT INTO cs290FinalUsers ( name , password ) VALUES ( ?, ? )");
		$stmt->bind_param("ss", $post_request->username, $password);

		if ($stmt->execute()) {
			echo "success";
		}
		else {
			echo "Could not insert data : " . mysqli_error($mysqli_handle);// . " " . mysqli_errno($mysqli_handle)
		}
	}
	elseif ($post_request->function == "getNew" && isset($_SESSION["id"])) {
		$stmt = $mysqli_handle->prepare("SELECT * FROM cs290FinalMessages WHERE receiver = ? AND timeViewed = NULL");
		$stmt->bind_param("s", $_SESSION["id"]);

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			$response = [];
			while($row = $result->fetch_array(MYSQLI_NUM)){
				$current_row = [];
				$current_row['id'] = $row[0];
				$current_row['sender'] = $row[1];
				$current_row['receiver'] = $row[2];
				$current_row['content'] = $row[3];
				$current_row['sent'] = $row[4];
				$current_row['viewed'] = $row[5];
				$response[] = $current_row;
			}
			echo json_encode($response);
		}
		else {
			echo "Error.";
		}
	}
	elseif ($post_request->function == "getConversation" && isset($_SESSION["id"])) {
		$stmt = $mysqli_handle->prepare("SELECT * FROM cs290FinalMessages WHERE ( sender = ? AND receiver = ? ) OR ( sender = ? AND receiver = ? )");
		$stmt->bind_param("isss", $_SESSION["id"], $post_request->otherPerson, $post_request->otherPerson, $_SESSION["id"]);

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			$response = [];
			while($row = $result->fetch_array(MYSQLI_NUM)){
				$current_row = [];
				$current_row['id'] = $row[0];
				$current_row['sender'] = $row[1];
				$current_row['receiver'] = $row[2];
				$current_row['content'] = $row[3];
				$current_row['sent'] = $row[4];
				$current_row['viewed'] = $row[5];
				$response[] = $current_row;
			}
			echo json_encode($response);
		}
		else {
			echo ("Error.");
		}
	}
	elseif ($post_request->function == "sendMessage" && isset($_SESSION["id"])) {
		$stmt = $mysqli_handle->prepare("INSERT INTO cs290FinalMessages ( sender, receiver, content, timeSent ) VALUES ( ?, ?, ?, ?)");
		$stmt->bind_param("ssss", $_SESSION["id"], $post_request->otherPerson, $post_request->content, $now->format('y-m-d H:i:s'));

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			echo "success";
		}
		else {
			echo "Error.";
		}
	}
	elseif ($post_request->function == "acceptFriend" && isset($_SESSION["id"])) {
		$id = $_SESSION['id'];
		$result = $mysqli_handle->query("SELECT * FROM cs290FinalUsers WHERE id = $id");
		if($result){
			$row = $result->fetch_assoc();
			$friends = json_decode($row['friends']);
			$friendRequests = json_decode($row['friendRequests']);
			$requester = $post_request->requester;
			if(in_array($requester, $friendRequests)){
				$stmt = $mysqli_handle->prepare("SELECT friends FROM cs290FinalUsers WHERE id = ?");
				$stmt->bind_param("i", $requester);
				if ($stmt->execute()) {
					$result = $stmt->get_result();
					$requesterFriendsJSON = $result->fetch_array(MYSQLI_NUM);
					$requesterFriends = json_decode($requesterFriendsJSON[0]);
					var_dump($requesterFriends);
				}
				else {
					echo "Error.";
				}
			}
			else{
				echo "Error:  Cannot find friend request.";
			}
		}
		else {
			echo ("Error.");// . $mysqli_handle->error// . " " . mysqli_errno($mysqli_handle)
		}
	}
	elseif ($post_request->function == "sendRequest" && isset($_SESSION["id"])) {
		$id = $_SESSION['id'];
		$newFriend = $post_request->requestName;
		$stmt = $mysqli_handle->prepare("SELECT friendRequests FROM cs290FinalUsers WHERE name = ?");
		$stmt->bind_param("s", $newFriend);
		if($stmt->execute()){
			$result = $stmt->get_result();
			$newFriendJSON = $result->fetch_array(MYSQLI_NUM);
			$newFriendRequests = json_decode($newFriendJSON[0]);
			array_push($newFriendRequests, $id);
			$newFriendJSON = json_encode($newFriendRequests);
			$stmt = $mysqli_handle->prepare("UPDATE cs290FinalUsers SET friendRequests = ? WHERE name = ?");
			$stmt->bind_param("ss", $newFriendJSON, $newFriend);
			if($stmt->execute()){
				echo "success";
			}
			else{
				echo "Error: Can't send request.";
			}
		} else {
			echo ("Error.");// . $mysqli_handle->error// . " " . mysqli_errno($mysqli_handle)
		}
	}
	elseif ($post_request->function == "getFriends" && isset($_SESSION["id"])) {
		$id = $_SESSION['id'];
		$result = $mysqli_handle->query("SELECT * FROM cs290FinalUsers WHERE id = $id");
		if($result){
			$row = $result->fetch_assoc();
			$friends = json_decode($row['friends']);
			$friendsNames = [];
			foreach ($friends as $id) {
				$person = [];
				$person['id'] = $id;
				$person['name'] = idToName($id, $mysqli_handle);
				$friendsNames[] = $person;
			}
			$friendRequests = json_decode($row['friendRequests']);
			$requestNames = [];
			foreach ($friendRequests as $id) {
				$person = [];
				$person['id'] = $id;
				$person['name'] = idToName($id, $mysqli_handle);
				$requestNames[] = $person;
			}
			$friendsObject['friends'] = $friendsNames;
			$friendsObject['friendRequests'] = $requestNames;
			echo json_encode($friendsObject);
		}
		else {
			echo ("Error.");
		}
	}
}

mysqli_close($mysqli_handle);
?>