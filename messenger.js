var people = document.getElementById("people");
var messages = document.getElementById("messages");
var requestBtn = document.getElementById("requestBtn");
var newFriend = document.getElementById("newFriend");

function getFriends(){
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "getFriends"}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				if(request.responseText != "success")
				{
					console.log(request.responseText);
					alert(request.responseText);
				}
				else{
					console.log(request.responseText);
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

requestBtn.onclick = function(){
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "sendRequest", "requestName": newFriend.value}));
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
					console.log("success");
					//window.location.assign("messenger.php");
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}