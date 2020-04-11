var username = localStorage.getItem("username")

var questionAnsBlock

function randomQuestionGenerator(){
var queryURL = "https://opentdb.com/api.php?amount=50&type=multiple"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    
    questionAnsBlock = $("<div>")
    $("#newQuestion").append(questionAnsBlock)

    // questions 
    var question = $("<p>")
    $(questionAnsBlock).append(question)
    var questionText = response.results[0].question
    question.text(questionText.replace(/\"/g, ""))
    
    var ansArray = [];

    ansArray.push(response.results[0].incorrect_answers[0],response.results[0].incorrect_answers[1],response.results[0].incorrect_answers[2])
    ansArray.push( response.results[0].correct_answer)

    console.log(ansArray)

    var ansNums = [0,1,2,3]

    function shuffle(ansNums){
        for(var j, x, i = ansNums.length; i; j = parseInt(Math.random() * i), x = ansNums[--i], ansNums[i] = ansNums[j], ansNums[j] = x);
        return ansNums;
    };  

    var randAns = shuffle(ansNums)

    for (let i = 0; i < randAns.length; i++) {

        var ansDiv = $("<div>").attr("id", i)
        ansDiv.text(ansArray[randAns[i]])
        $(question).append(ansDiv)
    }
})
};

randomQuestionGenerator();
