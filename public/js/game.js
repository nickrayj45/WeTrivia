var username = localStorage.getItem("username")
var questionBlock = $("#question")
var ansA = $("#answer-a")
var ansB = $("#answer-b")
var ansC = $("#answer-c")
var ansD = $("#answer-d")
var nextQuestion = $("#nextQuestion")

var questionAnsBlock
var correctAns
var questionsAsked = 0; 

var playersScore 

function playGame(){
    playersScore = 0; 

    randomQuestionGenerator();

}

playGame();

function randomQuestionGenerator(){
var queryURL = "https://opentdb.com/api.php?amount=50&type=multiple"

if (questionsAsked>= 10){
    endGame();
    return 
}

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
    
    return temp
};

$(nextQuestion).on("click", function () {
    playersScore --
    setTimeout(randomQuestionGenerator,1000)
});

$(".answerButton").on("click", function () {
    if ($(this).text() === correctAns){
        $(this).text("CORRECT")
        $('audio#right')[0].play()
        playersScore ++
        setTimeout(randomQuestionGenerator,1000)
    } else {
        $(this).text("WRONG")
        setTimeout(randomQuestionGenerator,1000)
        $('audio#wrong')[0].play()
    }
});

function endGame(){
    // new divs - Score 
    // high scores 
    // play again
    // post request to push data into db 
}