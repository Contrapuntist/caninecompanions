
$(document).ready(function () {
    // $("#results").hide();


    // jQuery EVENT LISTENERS 
    $("#submitbtn").on("click", function (e) { 
        e.preventDefault(); 
        
        console.log("button clicked"); 

        //Text input fields
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

        // variable data for calling API
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


        //var breedMatch = frmDogSize + frmDogHome + frmDogHair + frmDogEnergy; 
        var userInput = {
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
            breedMatch: function () {
                return this.dogSize + this.dogHome + this.dogHair + this.dogEnergy;
             }
        }
        
        console.log("form input: " + userInput); 

       
        console.log(userInput);

        // VALUE FOR TESTING BREED MATCH GET REQUEST
        // var breedMatch = "smallhomelighthighenergy";

        // var userInput = {		
        //     lastName: "Doe", // frmLastName,		
        //     firstName: "Jane", // frmFirstName, 		
        //     email: "jdoe1234@gmail.com", // frmEmail,		
        //     password: '1234567', // frmPassword,		
        //     zip: "60601", // frmZip 		
        //     dogSex: "male", // frmDogGender		
        //     dogAge: "baby", // frmDogAge		
        //     dogSize: "small", // frmDogSize 		
        //     dogHome: "home", // frmDogHome		
        //     dogHair: "light", // frmDogShed		
        //     dogEnergy: "calm", // frmDogEnergy		
        //     testbreedmatch: function () {		
        //        return this.dogSize + this.dogHome + this.dogHair + this.dogEnergy		
        //     }		
        // }

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
            console.log(inputObj.breedMatch());
            var getBreedUrl = "api/pets/" + inputObj.breedMatch();
            console.log('url: ' + getBreedUrl); 

            $.when(getBreedUrl).done(function(val) { 
            console.log("after when, breed val: " + val);   
                $.ajax({
                    url: val,
                    method: "GET"
                }).done(function (res) {
                    console.log(res); 
                    var dogbreedvalue = res.breedName;                  
                    makeQueryStrings(dogbreedvalue, inputObj); 

                }); 
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
                // wolframcall(wolfval);
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
            }).done(function(response) { 

               console.log(response.petfinder) 
                for (i = 1; i < 10; i++) {
                    document.getElementById("images" +i).src = response.petfinder.pets.pet[i].media.photos.photo[3].$t;

                    $(".name" +i).html(response.petfinder.pets.pet[i].name.$t );
                    $(".age" +i).html("Age: " + response.petfinder.pets.pet[i].age.$t);
                    $(".city" +i).html("City: " + response.petfinder.pets.pet[i].contact.city.$t);
                    $(".contact" +i).html("Contact: " + response.petfinder.pets.pet[i].contact.email.$t );
                    $(".sex" +i).html("Sex: " + response.petfinder.pets.pet[i].sex.$t);
                    $(".size" +i).html("Size: " + response.petfinder.pets.pet[i].size.$t );

                    var details = document.querySelector('.description' +i);
                    details.setAttribute('data-balloon', response.petfinder.pets.pet[i].description.$t);
                };
            });
        }
        
        // WOLFRAM API 'PROXY' CALL THROUGH SERVER/ROUTING
        function wolframcall (queryvalue) { 
            var wolfqrstr = '/wolframapi/' + queryvalue;
            console.log(wolfqrstr);
            $.ajax({
                method: 'get',
                url: wolfqrstr
            }).done(function(response) { 
                
                $('#results').show();
                // console.log('back in wolfram api call'); 
                //   console.log(response); 
                // $('#app').html(res);
                $(".dogInfo").html("<b>About: </b>" + response.queryresult.pods[4].subpods[0].plaintext + "<br>");
                $(".dogName").html(response.queryresult.pods[0].subpods[0].plaintext  );
                $(".dogHistory").html("<b> History: </b>" + response.queryresult.pods[6].subpods[0].plaintext );
        
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