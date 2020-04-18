// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local", { failureFlash: true }),
    function (req, res) {
      res.json(req.user);
    }
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
    // message for successful logout
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });

  //Routes for retrieving and creating chatlog
  app.get("/api/chatlog", function (req, res) {
    db.Chat.findAll({}).then(function (chatlog) {
      res.json(chatlog);
    });
  });

  app.post("/api/highscore", function (req, res) {
    db.Highscore.create({
      user: req.user.username,
      score: req.body.score,
      //took away the db
    }).then(function (dbHighscore) {
      // console.log("got created");
      res.json(dbHighscore);
    });
  });

  app.get("/api/highscore", function (req, res) {
    console.log("hello")
    db.Highscore.findAll({limit:10,order:[["score", "DESC"]]}).then(function (scores) {
      res.json(scores);
    });
  });

  app.post("/api/chatlog", function (req, res) {
    db.Chat.create({
      user: req.body.user,
      message: req.body.message,
    }).then(function (chatlog) {
      res.json(chatlog);
    });
  });
};

