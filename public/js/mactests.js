$(document).ready(function () {
    $("#getstarted").on("click", function (e) { 
        // e.preventdefault(); 
        console.log("button clicked"); 
        // var frmLastName = $('').val().trim();
        // var frmFirstName = $('').val().trim();
        // var frmEmail = $('').val().trim();
        // var frmZip = $('').val().trim();
        // var frmDogAge = $('').val().trim(); 
        
        // // data for breed matching
        // var frmDogSize = $('').val().trim(); 
        // var frmDogHome = $('').val().trim(); 
        // var frmDogHair = $('').val().trim(); 
        // var frmDogEnergy = $('').val().trim(); 
        
        // var breedMatch = frmDogSize + frmDogHome + frmDogHair + frmDogEnergy; 
        

        // validateForm()
        var testbreedmatch = "c";
        findBreed(testbreedmatch);
    });

    function findBreed (breedselect, formdetailsObj) { 
        console.log("in find breed"); 
        $.ajax({
            method: "GET",
            url: "api/pets/" + breedselect
        }).done(function (res) {
            console.log(res); 
            // var dogbreedvalue = json
            // makeQueryString(formdetailsObj, dogbreedvalue)
        });
    }

    function makeQueryString (formObj, dogbreed ){ 
        var queryStr = "https://api.petfinder.com" + dogbreed + formdetailsObj.dogAge + etc.
        // petfinder ajax 
        petfindercall()
    }
    
    function petfindercall (querystring) {
        $.ajax({
            method: 'get',
            url: '/petfinder'
        }).then(function(res) { 

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