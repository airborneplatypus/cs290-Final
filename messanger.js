var people = document.getElementById("people");
var messages = document.getElementById("messages");

/*loadPeople();

function loadPeople(){
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
					window.location.assign("messanger.php");
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}*/