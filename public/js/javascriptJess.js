var request = require("request");

/****************************************************
CONSTRUCTING THE WORLFRAM ALPHA API CALL
Note: added "%20dog" at front of wolframBaseUrlEnd
to ensure the returned result is a dog breed
(otherwise 'boxer' returns sports info)
****************************************************/

var wolframBaseUrlStart = 'http://api.wolframalpha.com/v2/query?input=';
var wolframBaseUrlEnd = '%20dog&appid=2TT3R3-JA5HLQH996&output=json';

//Replace spaces in the breed name so that it can be passed into the query string 
var wolframBreed = function() {
    //The string is hard-coded below; it should be replaced with breedName being returned from the mySQL database
    var string = 'Shar Pei'; 
    var replaced = string.split(' ').join('%20');
    return replaced;
}

var wolframApiUrl = wolframBaseUrlStart + wolframBreed() + wolframBaseUrlEnd;
console.log(wolframApiUrl);

request(wolframApiUrl, function(error, response, body) {
    
    // If the request was successful...
    if (!error && response.statusCode === 200) {
    
        // Console.log the breed description.
        console.log(JSON.parse(body).queryresult.pods[4].subpods[0].plaintext);
    }
});


/*
***************************************************
TRAVERSING THE DOG BREED JSON OBJECT
Note: each chain should be attached to the "cream
filling" name used in the function (e.g., data, response, result)
***************************************************

** BREED DESCRIPTION (in pod with "title": "Description")
.queryresult.pods[4].subpods[0].plaintext

TEMPERAMENT (in pod with "title": "Temperament")
.queryresult.pods[5].subpods[0].plaintext

DETAILED LIST OF CHARACTERISTIC TRAITS (in pod with "title": "Properties")
.queryresult.pods[3].subpods[0].plaintext

** BREED HISTORY (in pod with "title": "History")
.queryresult.pods[6].subpods[0].plaintext

ALTERNATE BREED NAMES (in the pod with "title": "Alternate names" )
.queryresult.pods[1].subpods[0].plaintext 

POD 0 : Breed 

*/
