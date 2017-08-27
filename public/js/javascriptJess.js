//FOR WOLFRAM API CALL

var wolframBaseUrlStart = 'http://api.wolframalpha.com/v2/query?input=';
var wolframBaseUrlEnd = '&appid=2TT3R3-JA5HLQH996&output=json';

//Replace spaces in the breed name so that it can be passed into the query string 
var wolframBreed = function() {
    //The string is hard-coded below; it should be replaced with breedName being returned from the mySQL database
    var string = 'Shar Pei'; 
    var replaced = string.split(' ').join('%20');
    return replaced;
}

var wolframApiUrl = wolframBaseUrlStart + wolframBreed() + wolframBaseUrlEnd;
console.log(wolframApiUrl);


