$(function () {
    var username ="";
    $.get("/api/user_data").then(function(data){
        username = data.username;
        getPreviousMessages();
    });
    var socket = io("/chat");
    var chatlog = [];

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
        appendMessages(msg, username==msg.user);
    });

    //functions
    function appendMessages(msg,isSelf){
        var messageChunkSelf= `
        <div class="card bg-primary rounded w-75 float-right z-depth-0 mb-1 last\">
            <div class="card-body p-2">
            <p class="card-text text-white">${msg.user}: ${msg.message}</p>
            </div>
        </div>
        `;
        var messageChunkOther=`<div class="card bg-light rounded w-75 z-depth-0 mb-1 message-text">
        <div class="card-body p-2">
          <p class="card-text black-text">${msg.user}: ${msg.message}</p>
        </div>
      </div>`;
        if (isSelf ===true){
            $("#messages").append($(messageChunkSelf));
        }
        else{
            $("#messages").append($(messageChunkOther));
        }
        
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    }

    function showPreviousMessages(limit){
        if (limit>chatlog.length){
            limit = chatlog.length;
        }
        for(var i =chatlog.length-limit; i<chatlog.length; i++){
            appendMessages(chatlog[i], username==chatlog[i].user);
        }
    }

    function getPreviousMessages(){
        $.get("/api/chatlog", function(data) {
            chatlog = data;
            showPreviousMessages(100);
        });
    }
});