# cs290-Final
Message System

All database interaction should take place through message.php.  It takes POST requests in the form of JSON objects with the key "function" to route the request.  The following is what requests are accepted and which keys are expected to be present:
function = "login":
  username
  password
  returns "success" or error
  
function = "addUser":
  username
  password
  returns "success" or error

//EVERYTHING BEYOND THIS POINT EXPECTS THE SESSION TO BE LOGGED IN
function = "getNew":  //This gets a list of messages not yet seen by the user
  //nothing, obtains id from session
  returns JSON array of arrays.  Each sub array corresponds with a single message and contains the keys {id, sender, receiver, content, sent viewed}
  
function = "getConversation":
  otherPerson
  returns JSON in same format as getNew
  
function = "sendMessage":
  otherPerson
  content
  returns "success" or error
