// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // app.get("/", function(req, res) {
  //   // If the user already has an account send them to the categories page
  //   if (req.user) {
  //     res.redirect("/categories");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  //for chat testing
  app.get("/chat", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/chat.html"));
  });

  // to connect to the signup
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

 app.get("/login", function(req, res) {
    // If the user already has an account send them to the categories page
    if (req.user) {
      res.redirect("/categories");
    } 
    //   else { console.log(res);
    //   res.render("/login", { messages: req.flash(res.message)});
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/categories", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/categories.html"));
  });

  // // once the user is logged in, send them to the categories page.
  // app.get("/triviaSelection", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/triviaSelection.html"));
  // });



};
