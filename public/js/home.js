// Variables that we will need
$("#startButton").on("click", function () {
  var user = $("#inputText").val();
  if (user.length > 0) {
    localStorage.setItem("username", user);
    window.location.replace("/game");
  }
});
