$(document).ready(function () {
    Breed.sync().then(() => {
        Breed.findOrCreate({where: {breedId: "smallhomelightcalm"}, defaults: {breedName: "Chihuahua" }});
        Breed.findOrCreate({where: {breedId: "smallhomeanycalm"}, defaults: {breedName: "Pug" }});
        Breed.findOrCreate({where: {breedId: "smallhomelighthighenergy"}, defaults: {breedName: "Beagle" }});
        Breed.findOrCreate({where: {breedId: "smallhomeanyhighenergy"}, defaults: {breedName: "Jack Russell Terrier" }});
        Breed.findOrCreate({where: {breedId: "smallapartmentlightcalm"}, defaults: {breedName: "Shih Tzu" }});
        Breed.findOrCreate({where: {breedId: "smallapartmentanycalm"}, defaults: {breedName: "Dachshund" }});
        Breed.findOrCreate({where: {breedId: "smallapartmentlighthighenergy"}, defaults: {breedName: "Poodle" }});
        Breed.findOrCreate({where: {breedId: "smallapartmentanyhighenergy"}, defaults: {breedName: "Corgi" }});
        Breed.findOrCreate({where: {breedId: "mediumhomelightcalm"}, defaults: {breedName: "Chow Chow" }});
        Breed.findOrCreate({where: {breedId: "mediumhomeanycalm"}, defaults: {breedName: "Hound" }});
        Breed.findOrCreate({where: {breedId: "mediumhomelighthighenergy"}, defaults: {breedName: "Pit Bull" }});
        Breed.findOrCreate({where: {breedId: "mediumhomeanyhighenergy"}, defaults: {breedName: "Labrador Retriever" }});
        Breed.findOrCreate({where: {breedId: "mediumapartmentlightcalm"}, defaults: {breedName: "Bulldog" }});
        Breed.findOrCreate({where: {breedId: "mediumapartmentanycalm"}, defaults: {breedName: "Shar Pei" }});
        Breed.findOrCreate({where: {breedId: "mediumapartmentlighthighenergy"}, defaults: {breedName: "Border Collie" }});
        Breed.findOrCreate({where: {breedId: "mediumapartmentanyhighenergy"}, defaults: {breedName: "Boxer" }});
        Breed.findOrCreate({where: {breedId: "largehomelightcalm"}, defaults: {breedName: "Mastiff" }});
        Breed.findOrCreate({where: {breedId: "largehomeanycalm"}, defaults: {breedName: "Great Dane" }});
        Breed.findOrCreate({where: {breedId: "largehomelighthighenergy"}, defaults: {breedName: "Pit Bull" }});
        Breed.findOrCreate({where: {breedId: "largehomeanyhighenergy"}, defaults: {breedName: "German Shepherd Dog" }});
        Breed.findOrCreate({where: {breedId: "largeapartmentlightcalm"}, defaults: {breedName: "American Bulldog" }});
        Breed.findOrCreate({where: {breedId: "largeapartmentanycalm"}, defaults: {breedName: "Shar Pei" }});
        Breed.findOrCreate({where: {breedId: "largeapartmentlighthighenergy"}, defaults: {breedName: "Border Collie" }});
        Breed.findOrCreate({where: {breedId: "largeapartmentanyhighenergy"}, defaults: {breedName: "Greyhound" }});
      });


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