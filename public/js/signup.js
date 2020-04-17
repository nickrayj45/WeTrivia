$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-inputSignup");
  var passwordInput = $("input#password-inputSignup");
  var usernameInput = $("input#username-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(), 
      username: usernameInput.val().trim(),
    };
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the categories page
  // Otherwise we log any errors
  function signUpUser(email, password, username) {
    $.post("/api/signup", {
      email: email,
      password: password, 
      username: username,
    })
      .then(function(data) {
        window.location.replace("/categories");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
