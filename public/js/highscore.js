const highScoresList = document.getElementById("highScoresList");
// const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
//   .join("");

  $.get("/api/highscore").then(function(data){
    highScoresList.innerHTML =
    data.map(score => {
      return `<li class="high-score">${score.user} - ${score.score}</li>`;
    })
    .join("");
  })

$("#catergories-btn").on("click",function(){
  window.location.replace("/categories");
});