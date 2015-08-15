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
				console.log(request.responseText);
				/* Fill in with frontend stuff.
				** Returns array of arrays.  Each subArray has 'name' and associated 'id'
				** Make list of friends and friend requests.
				** If user clicks on friend, bring them to messages with friend.
				** If user clicks on friend request, give them option to accept request.
				*/
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

function sendMessage(otherPerson, content){//Other person is the person's id
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "sendMessage", "otherPerson": otherPerson, "content": content}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				console.log(request.responseText);
				//Let user know message is sent?
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

function getConversation(otherPerson){//Other person is the person's id
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "getConversation", "otherPerson" : otherPerson}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				console.log(request.responseText);
				/* Fill in with frontend stuff.
				** responseText returns in format [{"id":messageId, "sender":sendersID, "receiver":yourId,
				** "content":messageContent, "sent":timeSent, "viewed":timeViewed }{next message of same format as first}]
				*/
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

function getNew(otherPerson){//Other person is the person's id
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "getNew"}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				console.log(request.responseText);
				/* Fill in with frontend stuff.
				** responseText returns in format [{"id":messageId, "sender":sendersID, "receiver":yourId,
				** "content":messageContent, "sent":timeSent, "viewed":timeViewed }{next message of same format as first}]
				*/
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

function acceptDenyFriend(otherPerson, accept){//accept = 1 to accept request, 0 to deny
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "acceptFriend", "otherPerson" : otherPerson, "accept": accept}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				console.log(request.responseText);
				/* Fill in with frontend stuff.
				** update friends list
				*/
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
					console.log(request.responseText);
					alert(request.responseText);
				}
				else{
					console.log("success");
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}