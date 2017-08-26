$(document).ready(function () {
    $("#getstarted").on("click", function (e) { 
        // e.preventdefault(); 
        console.log("button clicked"); 
        // var frmLastName = $('#lastName-js').val().trim();
        // var frmFirstName = $('#firstName-js').val().trim();
        // var frmEmail = $('#email-js').val().trim();
        // var frmPassword = $('#password-js').val().trim();
        // var frmZip = $('#zip-js').val().trim();
        // var frmDogAge = $('.dogAge-js').val().trim(); 
        
        // // data for breed matching
        // var frmDogSize = $('.dogSize-js').val().trim(); 
        // var frmDogHome = $('.dogHome-js').val().trim(); 
        // var frmDogHair = $('.dogHair-js').val().trim(); 
        // var frmDogEnergy = $('.dogEnergy-js').val().trim(); 
        
        // var breedMatch = frmDogSize + frmDogHome + frmDogHair + frmDogEnergy; 
        

        // validateForm()
        var testbreedmatch = "smallhomelighthighenergy";
        findBreed(testbreedmatch);
    });

    function findBreed (breedselect) { 
        console.log("in find breed"); 
        $.ajax({
            method: "GET",
            url: "api/pets/" + breedselect
        }).done(function (res) {
            console.log(res); 
        });
    }

    // function validateForm() {
    //     var x = name;
    //     var y = pic;

    //     if (x == "" || y == "" || score < 10 ) {
    //         alert("All fields in the form must by completed.");
    //         return false;
    //     } else {
    //         return postNewFriend(name, pic, score);
    //     }
    // }
    
    // function postNewFriend(name, pic, score) {
    //     var newFriend = {
    //         "name": name,
    //         "photo": pic,
    //         "scores": score 
    //     }  
         
    //     console.log(newFriend);   
    
    //     $.post("/api/friends", newFriend).then( function (data) { 
    //         console.log(data); 
    //         showMatch(data);
    //     }); 
    // }

}); 