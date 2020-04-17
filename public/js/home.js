// Variables that we will need
var startMusic = $("#startmusic")
var powerUp = $("powerup")

$("#login-btn").on("click", function () {
  $("#home").addClass("hide");
  $(".login-container").removeClass("hide");
  powerUp.play();
});

$("#signup-btn").on("click", function () {
  $("#home").addClass("hide");
  $(".signup-container").removeClass("hide");
  });

$(".signup-link").on("click", function () {
  $(".login-container").addClass("hide");
  $(".signup-container").removeClass("hide");
});

$(".login-link").on("click", function () {
  $(".signup-container").addClass("hide");
  $(".login-container").removeClass("hide");
});

$("#start-btn").on("click", function () {
  var user = $("#inputText").val();
  if (user.length > 0) {
    localStorage.setItem("username", user);
    window.location.replace("/game");
  }
});