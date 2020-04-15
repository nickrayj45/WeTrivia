$(".logout").on("click", function(){
console.log("clicked");
    logout();
});

function logout(){ 
// console.log("Hi");

    $.get("/logout")
    .then(function(){

        window.location.replace("/");
    })
    .catch(function(err) {
        console.log(err);
      });

};