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

session_start();

if(session_status() == PHP_SESSION_ACTIVE){

	$post_request = json_decode(file_get_contents('php://input'));

	if($post_request->function == "login"){
		$stmt = $mysqli_handle->prepare("SELECT * FROM cs290FinalUsers WHERE name = ?");
		$stmt->bind_param("s", $post_request->username);

		if ($stmt->execute()) {
			$result = $stmt->get_result();
			$response = [];
			$row = $result->fetch_array(MYSQLI_NUM);
			if(password_verify($post_request->password, $row[2])){
				echo "legit";
			}
			else{
				echo $row[2];
				echo "Invalid username or password.2";
				//var_dump($mysqli_handle->error);
			}
		} else {
			echo ("Invalid username or password.1");// . $mysqli_handle->error// . " " . mysqli_errno($mysqli_handle)
		}
	}
	if ($post_request->function == "addUser") {
		$password = password_hash($post_request->password, PASSWORD_DEFAULT);
		$stmt = $mysqli_handle->prepare("INSERT INTO cs290FinalUsers ( name , password ) VALUES ( ?, ? )");
		$stmt->bind_param("ss", $post_request->username, $password);

		if ($stmt->execute()) {
			echo("success");
		}
		else {
			echo ("Could not insert data : " . mysqli_error($mysqli_handle));// . " " . mysqli_errno($mysqli_handle)
		}
	}

}

mysqli_close($mysqli_handle);
?>