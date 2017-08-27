$(document).ready(function () {
    $("#submitbtn").on("click", function (e) { 
        e.preventDefault(); 
        console.log("button clicked"); 

        // var frmLastName = $('#lastName-js').val().trim();
        // console.log(frmLastName);
        // var frmFirstName = $('#firstName-js').val().trim();
        // console.log(frmFirstName);
        // var frmEmail = $('#email-js').val().trim();
        // console.log(frmEmail);
        // var frmPassword = $('#password-js').val().trim();
        // console.log(frmPassword);
        // var frmZip = $('#zip-js').val().trim();
        // console.log(frmZip);
        // var frmDogAge = $('.dogAge-js').val().trim(); 
        // console.log(frmDogAge);
        
        // // data for breed matching
        // var frmDogSize = $('.dogSize-js').val().trim(); 
        // console.log(frmDogSize);
        // var frmDogHome = $('.dogHome-js').val().trim(); 
        // console.log(frmDogHome);
        // var frmDogHair = $('.dogHair-js').val().trim(); 
        // console.log(frmDogHair);
        // var frmDogEnergy = $('.dogEnergy-js').val().trim(); 
        // console.log(frmDogEnergy);


        // var breedMatch = frmDogSize + frmDogHome + frmDogHair + frmDogEnergy; 
        
        var userInput = {
            firstName: "Jane", // frmFirstName, 
            lastName: "Doe", // frmLastName,
            email: "jdoe1234@gmail.com", // frmEmail,
            password: '1234567', // frmPassword,
            zip: "60601", // frmZip 
            dogGender: "M", // frmDogGender
            dogAge: "puppy", // frmDogAge
            dogSize: "S", // frmDogSize 
            dogHome: "house", // frmDogHome
            dogShed: "light", // frmDogShed
            dogEnergy: "calm" // frmDogEnergy
        }

        // validateForm()
        var testbreedmatch = "smallhomelighthighenergy";
        findBreed(testbreedmatch, userInput);
   
        function findBreed (breedselect, inputObj) { 
            console.log("in find breed");
            console.log(inputObj); 
            var getBreedUrl = "api/pets/" + breedselect;
            $.ajax({
                url: getBreedUrl,
                method: "GET"
            }).done(function (res) {
                console.log(res.breedName); 
                var dogbreedvalue = res.breedName;
                makeQueryString(inputObj, dogbreedvalue); 
            });
        }

        function makeQueryString (formObj, dogbreed ){ 
            console.log(formObj);
            // example query string; http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=Chihuahua&size=S&sex=&age=young&location=60657&output=full&format=json
            var queryStr = "http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=" + dogbreed 
            + "&sex=" + formObj.dogGender
            + "&age=" + formObj.dogAge
            + "&size=" + formObj.dogSize 
            + "&location=" + formObj.zip 
            + "&output=full&format=json";   
            
            console.log(queryStr);
            // petfinder ajax 
            // petfindercall() 
            return queryStr; 
        }
    
    // function petfindercall (querystring) {
    //     $.ajax({
    //         method: 'get',
    //         url: '/petfinder'
    //     }).then(function(res) { 

    //     });
    // }

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
}); 