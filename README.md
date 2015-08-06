# cs290-Final
Message System

We'll be creating a simple system that will allow users to message other users.  I think that this will be organized as having a separate login and new account page that send their data by POST to one central message.php.  This will be our central file with DB access.  It will handle all post requests and route them to the appropriate functions.  One way to still keep this modular without require multiple DB accesses is to have all the fuctions in separate php files and to bring them in using an "includes" in message.php to call them.

Most of the work will be done on the JavaScript side.  When the user first load the page, it will fetch all messages they haven't yet viewed and show an indicator near the names of the users that sent them.  When the user clicks on a sender's name, it will load all messages sent between the two users and display them in order on the page.
