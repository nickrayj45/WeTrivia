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
        var messageChunk= `
        <div class="card bg-primary rounded w-100 float-right z-depth-0 mb-1 last\">
                  <div class="card-body p-2">
                    <p class="card-text text-white">${msg.user}: ${msg.message}</p>
                  </div>
                </div>
        `
        $("#messages").append($(messageChunk));
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
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