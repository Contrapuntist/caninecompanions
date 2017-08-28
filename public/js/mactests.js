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
        // var formInput = {
        //     lastName: frmLastName,
        //     firstName: frmFirstName, 
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
            lastName: "Doe", // frmLastName,
            firstName: "Jane", // frmFirstName, 
            email: "jdoe1234@gmail.com", // frmEmail,
            password: '1234567', // frmPassword,
            zip: "60601", // frmZip 
            dogSex: "male", // frmDogGender
            dogAge: "baby", // frmDogAge
            dogSize: "small", // frmDogSize 
            dogHome: "house", // frmDogHome
            dogHair: "light", // frmDogShed
            dogEnergy: "calm", // frmDogEnergy
            testbreedmatch: function () {
               return this.dogSize + this.dogHome + this.dogHair + this.dogEnergy
            }
        }

       
        console.log(userInput.testbreedmatch());

        // VALUE FOR TESTING BREED MATCH GET REQUEST
        // var testbreedmatch = "smallhomelighthighenergy";

        findBreed(userInput); 


        // CREATE NEW USER 
        function userCreate (userObj) { 
            $.post("/api/newuser", userObj, function (data) {
                console.log("user added: " + data);
            });
        }

        // MATCH BREED BASED ON USER INPUT
        function findBreed (inputObj) { 
            console.log("in find breed");
            console.log(inputObj); 
            console.log(inputObj.testbreedmatch());
            var getBreedUrl = "api/pets/" + inputObj.testbreedmatch();
            console.log('url: ' + getBreedUrl);
            $.ajax({
                url: "api/pets/" + inputObj.testbreedmatch(),
                method: "GET"
            }).done(function (res) {
                console.log(res); 
                // var dogbreedvalue = res.breedName;
                
                // makeQueryStrings(dogbreedvalue, inputObj); 
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
                // wolframcall(b);
            });

        }

        // METHOD FOR CREATING PETFINDER QUERY STRING
        function makePFQueryString (formObj, dogbreed ) { 
            console.log(formObj); 
            
            if (dogbreed.includes(" ")) { 
                dogbreed = dogbreed.split(' ').join('+');
            }

            var adjustDogSex = function () {
                var sex = ''
                if (formObj.dogGender === "male") {
                    sex = "&sex=M"; 
                } else if ( formObj.dogGender === "female") {  
                    sex = "&sex=F"; 
                    return sex;
                } else {
                    return sex;
                } 
            }
            var adjustDogSize = function () {
                var size = ''

                if (formObj.dogSize === "small") { 
                    size = "&size=S";
                    return size;
                } else if (formObj.dogSize === "medium") { 
                    size = "&size=M";
                    return size;
                } else { 
                    size = "&size=L";
                    return size;
                }
            } 
            // example query string; http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=Chihuahua&size=S&sex=&age=young&location=60657&output=full&format=json
            var queryStrPetfinder = "http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=" 
            + dogbreed 
            + adjustDogSex() 
            + "&age=" + formObj.dogAge
            + adjustDogSize()
            + "&location=" + formObj.zip 
            + "&output=full&format=json";   

            console.log(queryStrPetfinder);
            console.log(formObj);
            return queryStrPetfinder; 
        }
        
        // METHOD FOR CREATING WOLFRAM API QUERY STRING
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

        // PETFINDER API 'PROXY' CALL THROUGH SERVER/ROUTING 
        function petfindercall (querystring) {
            console.log('in petfinder api call'); 
            var queryStr = "/petfinderapi"
            console.log('petfinder API string URL: ' + queryStr );
            $.ajax({
                method: 'get',  
                url: '/petfinderapi'
            }).done(function(res) { 
                console.log(res); 
            });
        }
        
        // WOLFRAM API 'PROXY' CALL THROUGH SERVER/ROUTING
        function wolframcall (querystring) { 
            $.ajax({
                method: 'get',
                url: '/wolframapi',
                data: querystring
            }).done(function(res) { 
                console.log(res); 
            });
        }
 
    // TESTING METHOD TO DO SYNCHRONIZED CALL WITH WHEN **** (NOT DONE) ****        
    // function multiAPIcall (petfinderquery, wolframquery) { 
    //     $.when( 
    //         $.ajax({ method: 'get', url: '/petfinderapi' }), 
    //         $.ajax({ method: 'get', url: '/wolframapi' }))
    // }     

    }); // CLOSE TO EVENT ON 'CLICK'

}); 