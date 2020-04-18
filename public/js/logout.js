$(".logout").on("click", function(){
console.log("clicked");
    logout();
});

function logout(){ 

    $.get("/logout")
    .then(function(){

        window.location.replace("/");
    })
    .catch(function(err) {
        console.log(err);
      });

};