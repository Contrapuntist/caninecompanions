$(document).ready(function () {
    $.post()
    
    
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
        // var formInput = {
        //     firstName: frmFirstName, 
        //     lastName: frmLastName,
        //     email: frmEmail,
        //     password: frmPassword,
        //     zip: frmZip, 
        //     dogGender: frmDogGender,
        //     dogAge: frmDogAge,
        //     dogSize: frmDogSize, 
        //     dogHome: frmDogHome,
        //     dogShed: frmDogShed,
        //     dogEnergy: frmDogEnergy,
        // }
        
        // console.log("form input: " + formInput); 

        var userInput = {
            firstName: "Jane", // frmFirstName, 
            lastName: "Doe", // frmLastName,
            email: "jdoe1234@gmail.com", // frmEmail,
            password: '1234567', // frmPassword,
            zip: "60601", // frmZip 
            dogGender: "male", // frmDogGender
            dogAge: "baby", // frmDogAge
            dogSize: "small", // frmDogSize 
            dogHome: "house", // frmDogHome
            dogShed: "light", // frmDogShed
            dogEnergy: "calm" // frmDogEnergy
        }

        // validateForm()
        var testbreedmatch = "smallhomelighthighenergy";
        $.when( )
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
                
                makeQueryStrings(dogbreedvalue, inputObj); 
                // makePFQueryString(inputObj, dogbreedvalue); 
                // queryStringWolfram(dogbreedvalue); 
            }); 
        }

        function makeQueryStrings(dogbreed, inputObj) { 
            var a = makePFQueryString(inputObj, dogbreed); 
            var b = queryStringWolfram(dogbreed); 
           
            $.when ( a, b ).done(function (query1, query2) {
                console.log('from WHEN function'); 
                console.log(query1);
                console.log(query2);
                console.log('===================');
                petfindercall(a);
                
            });

        }

        function makePFQueryString (formObj, dogbreed ) { 
            console.log(formObj); 
            
            if (dogbreed.includes(" ")) { 
                dogbreed = dogbreed.split(' ').join('+');
            }

            if (formObj.dogGender === "male") {
                formObj.dogGender = "M";
            } else if ( formObj.dogGender === "female") {  
                formObj.dogGender === "F"; 
            } else {
                delete formObj.dogGender; 
            } 

            var adjustDogSize = function () {
                if (formObj.dogSize === "small") { 
                    formObj.dogSize = "S"
                } else if (formObj.dogSize === "medium") { 
                    formObj.dogSize = "M"
                } else { 
                    formObj.dogSize = "L"
                }
            } 
            // example query string; http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=Chihuahua&size=S&sex=&age=young&location=60657&output=full&format=json
            var queryStrPetfinder = "http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=" 
            + dogbreed 
            + "&sex=" + formObj.dogGender
            + "&age=" + formObj.dogAge
            + "&size=" + formObj.dogSize 
            + "&location=" + formObj.zip 
            + "&output=full&format=json";   

            console.log(queryStrPetfinder);
            console.log(formObj);
            return queryStrPetfinder; 
        }
    
        function queryStringWolfram (dogbreed) { 
        
            var wolframBaseUrlStart = 'http://api.wolframalpha.com/v2/query?input=';
            var wolframBaseUrlEnd = '%20dog&appid=2TT3R3-JA5HLQH996&output=json';
            
            //Replace spaces in the breed name so that it can be passed into the query string 
            var wolframBreed = function() {
                //The string is hard-coded below; it should be replaced with breedName being returned from the mySQL database
                var string = dogbreed; 
                var replaced = string.split(' ').join('%20');
                return replaced;
            }
            
            var wolframApiUrl = wolframBaseUrlStart + wolframBreed() + wolframBaseUrlEnd;
            console.log(wolframApiUrl); 

            return wolframApiUrl;
        }    

        function petfindercall (querystring) {
            $.ajax({
                method: 'get',
                url: '/petfinderapi',
                data: querystring
            }).done(function(res) { 
                console.log(res); 
            });
        }
    

    // function multiAPIcall (petfinderquery, wolframquery) { 
    //     $.when( 
    //         $.ajax({ method: 'get', url: '/petfinderapi' }), 
    //         $.ajax({ method: 'get', url: '/wolframapi' }))
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