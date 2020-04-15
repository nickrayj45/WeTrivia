var tv = $("#tv")
var scienceNature =$("#scienceNature")
var japAnime =$("#japAnime")
var sports =$("#sports")
var genKnow =$("#genKnow")
var computers =$("#computers")
var geography =$("#geography")

var queryURL
var tvURL = "https://opentdb.com/api.php?amount=50&category=14&type=multiple"
var sciNatURL = "https://opentdb.com/api.php?amount=50&category=17&type=multiple"
var japAnimeURL = "https://opentdb.com/api.php?amount=50&category=31&type=multiple"
var sportsURL = "https://opentdb.com/api.php?amount=50&category=21&type=multiple"
var genKnowURL = "https://opentdb.com/api.php?amount=50&type=multiple"
var computersURL = "https://opentdb.com/api.php?amount=50&category=18&type=multiple"
var geographyURL = "https://opentdb.com/api.php?amount=50&category=22&type=multiple"


$(tv).on("click", function(){
    localStorage.setItem("gameType", tvURL)
    window.location.replace("game.html");
});

$(scienceNature).on("click", function(){
    localStorage.setItem("gameType", sciNatURL)
    window.location.replace("game.html");
});

$(japAnime).on("click", function(){
    localStorage.setItem("gameType", japAnimeURL)
    window.location.replace("game.html");
});

$(sports).on("click", function(){
    localStorage.setItem("gameType", sportsURL)
    window.location.replace("game.html");
});

$(genKnow).on("click", function(){
    localStorage.setItem("gameType", genKnowURL)
    window.location.replace("game.html");
});

$(computers).on("click", function(){
    localStorage.setItem("gameType", computersURL)
    window.location.replace("game.html");
});

$(geography).on("click", function(){
    localStorage.setItem("gameType", geographyURL)
    window.location.replace("game.html");
});