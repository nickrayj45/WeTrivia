// Variables that we will need
$("#login-btn").on("click", function () {
  $("#home").addClass("hide");
  $(".login-container").removeClass("hide");
});

$("#signup-btn").on("click", function () {
  $("#home").addClass("hide");
  $(".signup-container").removeClass("hide");
  });





$("#start-btn").on("click", function () {
  var user = $("#inputText").val();
  if (user.length > 0) {
    localStorage.setItem("username", user);
    window.location.replace("/game");
  }
});