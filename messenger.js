var people = document.getElementById("people");
var messages = document.getElementById("messages");
var requestBtn = document.getElementById("requestBtn");
var newFriend = document.getElementById("newFriend");
var sendBtn = document.getElementById("sendMessage");
var toSend = document.getElementById("toSend");
var messageTitle = document.getElementById("messageTitle");

var myFriends = [];
var myRequests = [];
var waiting = [];
var currentPerson = null;
var currentName = null;

getFriends();
setInterval(function(){
	getFriends();
	if(currentPerson != null){
		getConversation(currentPerson);
	}
},10000)

function person(){
	this.name = '';
	this.id = '';

	this.setPerson = function(nameIn, idIn){
		this.name = nameIn;
		this.id = idIn;
	}

	this.makeHTML = function(friend){
		var myId = this.id;
		var myName = this.name;
		if(friend){
			var li = document.createElement("li");
			var text = document.createTextNode(this.name);
			li.appendChild(text);
			people.appendChild(li);
			var messageBtn = document.createElement("button");
			messageBtn.onclick = function(){
				getConversation(myId);
				currentPerson = myId;
				currentName = myName;
			}
			text = document.createTextNode("talk");
			messageBtn.appendChild(text);
			li.appendChild(messageBtn);
		}
		else{
			var li = document.createElement("li");
			var text = document.createTextNode(this.name);
			li.appendChild(text);
			var friendBtn = document.createElement("button");
			friendBtn.className = "btn";
			var text = document.createTextNode('accept');
			friendBtn.appendChild(text);
			friendBtn.onclick = function(){
				acceptDenyFriend(myId,1);
				getFriends();
			}
			li.appendChild(friendBtn);
			var denyBtn = document.createElement("button");
			denyBtn.className = "btn-danger";
			text = document.createTextNode('deny');
			denyBtn.appendChild(text);
			denyBtn.onclick = function(){
				acceptDenyFriend(myId,0);
				getFriends();
			}
			li.appendChild(denyBtn);
		}
		people.appendChild(li);
	}
}

function message(){
	this.sender = '';
	this.receiver = '';
	this.content = '';
	this.sent = '';
	this.viewed = '';

	this.setMessage = function(sender, receiver, content, sent, viewed){
		this.sender = sender;
		this.receiver = receiver;
		this.content = content;
		this.sent = sent;
		this.viewed = viewed;
	}

	this.makeHTML = function(){
		var li = document.createElement("li");
		var text = document.createTextNode(this.content + " | Sent By: " + this.sender.name + " | " + this.sent);
		li.appendChild(text);
		messages.appendChild(li);
	}
}

function getFriends(){
	var request = new XMLHttpRequest();
	request.open("POST", "message.php", true);
	//console.log(JSON.stringify(m));
	request.send(JSON.stringify({"function" : "getFriends"}));
	//console.log(m);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			if(request.status === 200){
				//console.log(request.responseText);
				/* Fill in with frontend stuff.
				** Returns array of arrays.  Each subArray has 'name' and associated 'id'
				** Make list of friends and friend requests.
				** If user clicks on friend, bring them to messages with friend.
				** If user clicks on friend request, give them option to accept request.
				*/
				genFriends(JSON.parse(request.responseText));
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
				//console.log(request.responseText);
				//Let user know message is sent?
				getConversation(otherPerson);
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
				//console.log(request.responseText);
				/* Fill in with frontend stuff.
				** responseText returns in format [{"id":messageId, "sender":sendersID, "receiver":yourId,
				** "content":messageContent, "sent":timeSent, "viewed":timeViewed }{next message of same format as first}]
				*/
				genConversation(JSON.parse(request.responseText));
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
				//console.log(request.responseText);
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
				//console.log(request.responseText);
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
					alert("Request Sent");
					//console.log("success");
				}
			}
			else{
				alert("Error! " + request.status);
			}
		}
	}
}

function genFriends(friendsList){
	while(people.firstChild){
		people.removeChild(people.firstChild);
	}
	myFriends = friendsList.friends;
	myRequests = friendsList.friendRequests;
	myFriends.forEach(function(individual){
		var friend = new person();
		friend.setPerson(individual.name, individual.id);
		friend.makeHTML(1);
	})
	myRequests.forEach(function(individual){
		var friend = new person();
		friend.setPerson(individual.name, individual.id);
		friend.makeHTML(0);
	})
}

function genConversation(conversationList){
	if(currentPerson != null){
		messageTitle.textContent = "Messaging " + currentName;
	}
	while(messages.firstChild){
		messages.removeChild(messages.firstChild);
	}
	conversationList.forEach(function(individual){
		var sender = new person();
		sender.setPerson(individual.sender.name, individual.sender.id);
		var receiver = new person();
		receiver.setPerson(individual.receiver.name, individual.receiver.id);
		var current = new message();
		current.setMessage(sender, receiver, individual.content, individual.sent, individual.viewed);
		current.makeHTML();
	})
}

sendBtn.onclick = function(){
	sendMessage( currentPerson, toSend.value);
	toSend.value = "";
}