$(function () {
    var username = localStorage.getItem("username")
    var socket = io("/chat");
    var chatlog = [];
    
    getPreviousMessages();

    $("form").submit(function(e){
      e.preventDefault(); // prevents page reloading
      //post message
      var newChat = {user: username, message:$("#m").val()};
      $.post("/api/chatlog",newChat);
      socket.emit("chat message", newChat);
      $("#m").val("");
      return false;
    });

    //retrieve message
    socket.on("chat message", function(msg){
        appendMessages(msg);
    });


    //functions
    function appendMessages(msg){
        $("#messages").append($('<li>').text(msg.user+": "+msg.message));
    }

    function showPreviousMessages(limit){
        if (limit>chatlog.length){
            limit = chatlog.length;
        }
        for(var i =chatlog.length-limit; i<chatlog.length; i++){
            appendMessages(chatlog[i]);
        }
    }

    function getPreviousMessages(){
        $.get("/api/chatlog", function(data) {
            chatlog = data;
            showPreviousMessages(100);
        });
    }
});