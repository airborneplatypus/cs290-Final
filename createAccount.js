var createBtn = document.getElementById("createBtn");
var usernameField = document.getElementById("username");
var passwordField = document.getElementById("password");
var vPasswordField = document.getElementById("vPassword");
var title = document.getElementById("Title");
var accountTable = document.getElementById("accountTable");

createBtn.onclick = function(){
	if(passwordField.value == vPasswordField.value){
		var request = new XMLHttpRequest();
		request.open("POST", "message.php", true);
		//console.log(JSON.stringify(m));
		request.send(JSON.stringify({"function" : "addUser", "username": usernameField.value, "password": passwordField.value}));
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
						while(accountTable.firstChild){
							accountTable.removeChild(accountTable.firstChild);
						}
						title.innerHTML = "Account Created.  Taking you to login screen...";
						setTimeout(function(){
							window.location.replace("login.php");
						},2000)	
					}
				}
				else{
					alert("Error! " + request.status);
					console.log(request);
				}
			}
		}
	}
	else{
		alert("Passwords don't match!");
	}
}