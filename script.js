window.onload = function(){
    init();
}

// global variable
let time = 5;
let score = 0;
let playing;

//grab DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDiplay = document.querySelector("#scoreGained");
const timeDisplay = document.querySelector("#secondsLeft");
const messageDisplay = document.querySelector("#gameResults");
const secondShownOnTop = document.querySelector("#seconds");

//arrays of words
var words = [
'snowball',
'roof',
'fly',
'bicycle',
'bear',
'cape',
'puppet',
'piano',
'lipstick',
'salute',
'penguin',
'banana',
'peel',
'whisper',
'popsicle',
'frankenstein',
'earthquake',
'road',
'rain',
'alarm',
'clock',
'dog',
'leash',
'pajamas',
'slam',
'fiddle',
'seashell',
'seesaw',
'cheerleader',
'shopping',
'newspaper',
'twist',
'rhinoceros',
'cow',
'tickle',
'fetch',
'violin',
'cage',
'braid',
'skateboard',
'stairs',
'trumpet',
'mop',
'shovel',
'money',
'soap',
'saddle',
'wink',
'tree',
'spider',
'man',
'think'];

//initialize the game
function init(){
    console.log("hello initializing");
    // load random words from array
    showWord(words);
    //match word input
    wordInput.addEventListener('change',startMatch);
    //call timer
    setInterval(timer,1000);
    //set game status
    setInterval(checkStatus,50);
    startMatch();
}

//To show random words
function showWord(words){
    //To generate random words
    const randomIndex = Math.floor(Math.random() * words.length);
    // console.log(randomIndex);
    //output random word
    currentWord.innerHTML = words[randomIndex];
    currentWord.style.opacity = 1;
}

//to counter
function timer(){
    //check if there is time
    if(time>0){
        //decrease the time
        time--;
        //show time
        timeDisplay.innerHTML = time;
    }
    else if(time===0){
        //game is over!
        playing = false;
    }
}

// check game status
function checkStatus(){
    if(!playing && time===0){
        messageDisplay.innerHTML = "GAME OVER!!!!";
    }
}
function startMatch(){
    if (matchWord()){
        console.log("match");
    }
    }

function matchWord(){
    if(wordInput.value === currentWord.innerHTML){
            messageDisplay.innerHTML= "CORRECT!";
            return true;
        }
        else{
            messageDisplay.innerHTML="";
            return false;
        }
}