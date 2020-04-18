
var username = localStorage.getItem("username")
var questionBlock = $("#question")
var ansA = $("#answer-a")
var ansB = $("#answer-b")
var ansC = $("#answer-c")
var ansD = $("#answer-d")
var nextQuestion = $("#nextQuestion")
var gameScreen = $("#gamescreen")
var highScoresTable = $(".highScoresTable")
var results = $("#resultsArea")
var playAgain = $("#playAgain")

var right = $("#right")
var wrong = $("#wrong")
//
var goHome = $("#goHome")


var questionAnsBlock
var correctAns
var questionsAsked = 0; 

//replace random numbers- this keep track of score
var playersScore 
 

function playGame(){
    playersScore = 0; 
    randomQuestionGenerator();
}

playGame();

function randomQuestionGenerator(){

var queryURL = localStorage.getItem("gameType")

if (questionsAsked>= 4){
    endGame();
    return 
}

$(".answerButton").removeClass('activeRight');
$(".answerButton").removeClass('activeWrong');

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
        
    var questionText = response.results[0].question
    var newQuestionStr = replaceAll(questionText)
    questionBlock.text(newQuestionStr)
    
    var ansArray = [];

    correctAns =  replaceAll(response.results[0].correct_answer)

    ansArray.push(response.results[0].incorrect_answers[0],response.results[0].incorrect_answers[1],response.results[0].incorrect_answers[2])
    ansArray.push(response.results[0].correct_answer)

    console.log(ansArray)

    var ansNums = [0,1,2,3]

    function shuffle(ansNums){
        for(var j, x, i = ansNums.length; i; j = parseInt(Math.random() * i), x = ansNums[--i], ansNums[i] = ansNums[j], ansNums[j] = x);
        return ansNums;
    };  

    var randAns = shuffle(ansNums)

    ansA.text(replaceAll(ansArray[randAns[0]]))
    ansB.text(replaceAll(ansArray[randAns[1]]))
    ansC.text(replaceAll(ansArray[randAns[2]]))
    ansD.text(replaceAll(ansArray[randAns[3]]))

    questionsAsked ++
})
};


function replaceAll (string){
    var temp = string.replace(/&quot;/g, "\"");
    temp = temp.replace(/&#039;/g, "\'");
    temp = temp.replace(/&ldquo;/g, "\"");
    temp = temp.replace(/&rdquo;/g, "\"");
    temp = temp.replace(/&amp;/g, "\#");
    temp = temp.replace(/&Uuml;/g, "\Ü");
    temp = temp.replace(/&hellip;/g, "\ ...");
    temp = temp.replace(/&deg;/g, "\°");
    
    return temp
};

$(nextQuestion).on("click", function () {
    playersScore --
    setTimeout(randomQuestionGenerator,1000)
});

$(".answerButton").on("click", function () {
    if ($(this).text() === correctAns){
        $(this).text("CORRECT")
        // right[0].play()
        playersScore ++
        $(this).addClass('activeRight');
        setTimeout(randomQuestionGenerator,1000)
    } else {
        $(this).text("WRONG")
        // wrong[0].play()
        $(this).addClass('activeWrong');
        setTimeout(randomQuestionGenerator,1000)
    }
});


function endGame() {
  // hiding the question and answers using class hide
//   $(gameScreen).addClass("hide");
//   $(questionBlock).addClass("hide");

//   // removing class hide from results are - allows user to see results
//   $(results).removeClass("hide");
//   $(highScores).removeClass("hide");

//   $(highScores).text("Your Score: " + playersScore);

  var newHighscore = {
    score: playersScore
  };
  
  $.post("/api/highscore", newHighscore, function() {
    window.location.replace("/highscore");
    return;
  });
}
  




