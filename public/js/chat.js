$(function () {
    var socket = io("/chat");
    $("form").submit(function(e){
      e.preventDefault(); // prevents page reloading
      console.log("submit");
      console.log($("#m").val());
      socket.emit("chat message", $("#m").val());
      $("#m").val("");
      return false;
    });
    socket.on("chat message", function(msg){
        $("#messages").append($('<li>').text(msg));
    });
});