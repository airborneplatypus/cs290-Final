var loginBtn = document.getElementById("loginBtn");
var usernameField = document.getElementById("username");
var passwordField = document.getElementById("password");

loginBtn.onclick = function(){
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "login", "username": usernameField.value, "password": passwordField.value}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				if(request.responseText != "success")
				{
					console.log("alert");
					alert(request.responseText);
				}
				else{
					//stuff
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}