$(document).ready(function () {
    
    // jQuery EVENT LISTENERS 
    $("#submitbtn").on("click", function (e) { 
        e.preventDefault(); 
        
        console.log("button clicked"); 

        //Need to figure out why value is not being stored for text input fields
        var frmLastName = $("#lastName-js").val().trim();
        console.log(frmLastName);
        var frmFirstName = $("#firstName-js").val().trim();
        console.log(frmFirstName);
        var frmEmail = $("#email-js").val().trim();
        console.log(frmEmail);
        var frmPassword = $("#password-js").val().trim();
        console.log(frmPassword);
        var frmZip = $("#zip-js").val().trim();
        console.log(frmZip);

        var frmDogSex = $("input[name='dog-sex']:checked").val();
        console.log(frmDogSex);
        var frmDogAge = $("input[name='dog-age']:checked").val();
        console.log(frmDogAge);
        
        // data for breed matching
        var frmDogSize = $("input[name='dog-size']:checked").val(); 
        console.log(frmDogSize);
        var frmDogHome = $("input[name='dog-home']:checked").val(); 
        console.log(frmDogHome);
        var frmDogHair = $("input[name='dog-hair']:checked").val();
        console.log(frmDogHair);
        var frmDogEnergy = $("input[name='dog-energy']:checked").val(); 
        console.log(frmDogEnergy);


        var breedMatch = frmDogSize + frmDogHome + frmDogHair + frmDogEnergy; 
        var formInput = {
            lastName: frmLastName,
            firstName: frmFirstName, 
            email: frmEmail,
            password: frmPassword,
            zip: frmZip, 
            dogSex: frmDogSex,
            dogAge: frmDogAge,
            dogSize: frmDogSize, 
            dogHome: frmDogHome,
            dogHair: frmDogHair,
            dogEnergy: frmDogEnergy,
        }
        
        console.log("form input: " + formInput); 

       
        console.log(formInput);

        // VALUE FOR TESTING BREED MATCH GET REQUEST
        // var testbreedmatch = "smallhomelighthighenergy";

        findBreed(formInput); 
     

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
                var dogbreedvalue = res.breedName;
                
                makeQueryStrings(dogbreedvalue, inputObj); 
                // makePFQueryString(inputObj, dogbreedvalue); 
                // queryStringWolfram(dogbreedvalue); 
            }); 
        }

        function makeQueryStrings(dogbreed, inputObj) { 
            var a = makePFQueryString(inputObj, dogbreed); 
            var b = queryStringWolfram(dogbreed); 
            
            $.when ( a, b ).done(function (query1, wolfval) {
                console.log('from WHEN function'); 
                console.log(query1);
                console.log(wolfval);
                console.log('===================');
                petfindercall(query1);
                wolframcall(wolfval);
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
            var queryStrPetfinder = "key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=" 
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
        
            // var wolframBaseUrlStart = 'http://api.wolframalpha.com/v2/query?input=';
            // var wolframBaseUrlEnd = '%20dog&appid=2TT3R3-JA5HLQH996&output=json';
            
            //Replace spaces in the breed name so that it can be passed into the query string 
            var wolframBreed = function() {
                //The string is hard-coded below; it should be replaced with breedName being returned from the mySQL database
                var string = dogbreed; 
                var replaced = string.split(' ').join('%20');
                return replaced;
            }
            
            // var wolframApiUrl = wolframBaseUrlStart + wolframBreed() + wolframBaseUrlEnd;
            // console.log(wolframApiUrl); 
            dogbreed = wolframBreed();
            console.log(dogbreed);
            return dogbreed;
        }    

        // PETFINDER API 'PROXY' CALL THROUGH SERVER/ROUTING 
        function petfindercall (querystring) {
            console.log('in petfinder api call'); 
            var queryStr = "/petfinderapi";
            console.log('petfinder API string URL: ' + querystring );
            $.ajax({
                method: 'get',  
                url: queryStr,
                data: querystring
            }).done(function(res) { 
                console.log(res); 
            });
        }
        
        // WOLFRAM API 'PROXY' CALL THROUGH SERVER/ROUTING
        function wolframcall (queryvalue) { 
            var wolfqrstr = '/wolframapi/' + queryvalue;
            console.log(wolfqrstr);
            $.ajax({
                method: 'get',
                url: wolfqrstr
            }).done(function(res) { 
                console.log(res); 
                console.log('back in wolfram api call'); 
                // $('#app').html(res);
        
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