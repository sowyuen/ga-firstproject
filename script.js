// global variable
let time;
let timeLevel;
let score = 0;
let highScoreEasy =0;
let highScoreMedium =0;
let highScoreHard =0;
let previousSelectedIndex;
let timerInterval;
let currentLevel;

//grab DOM elements
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#scoreGained");
const timeDisplay = document.querySelector("#secondsLeft");
const messageDisplay = document.querySelector("#gameResults");
const circular = document.querySelector("#circular");
const highScoreDisplay = document.querySelector("#highScoreGained");
var currentWordDisplay = null;

//setting animations
const secondsDisplay = document.querySelector("#secondsLeft");
secondsDisplay.classList.add('animated','heartBeat','infinite');
const gameMessage =  document.querySelector('#gameResults');
gameMessage.classList.add('animated', 'tada');

//buttons to choose level
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");

//popup page
const tryAgainButt = document.querySelector("#tryAgainButton");
const chooseLevelButt = document.querySelector("#chooseLevelButton");


//arrays of words
var wordsArray = [
'snowball',
'roof',
'bicycle',
'puppet',
'piano',
'lipstick',
'salute',
'penguin',
'banana',
'whisper',
'popsicle',
'frankenstein',
'earthquake',
'leash',
'pajamas',
'fiddle',
'seashell',
'seesaw',
'cheerleader',
'shopping',
'newspaper',
'rhinoceros',
'tickle',
'violin',
'cage',
'skateboard',
'stairs',
'trumpet',
'shovel',
'money',
'saddle',
'tree',
'spider',
'think',
'pizzas',
'suburban',
'assuming',
'obstinance',
'foramens',
'general',
'Singapore',
'Thailand',
'China',
'pastoral',
'carpenter',
'rabbits',
'sack',
'brainy',
'report',
'suck',
'snore',
'soup',
'cherry',
'panoramic',
'brass',
'achievements',
'preparations',
'animations',
'emblems',
'encouragement',
'recognition',
'p@ssw0rd',
'p@ssc0de',
'popularity',
'eliminations',
'juggernaut',
'airborne',
'fridge',
'reliability',
'emotions',
'definitely',
'government',
'publicly',
'receive',
'politician',
'bookkeeper',
'hippopo',
];

//To show random words
function showWord(words){
    //To generate random words
    const randomIndex = Math.floor(Math.random() * words.length);
    // console.log(randomIndex);
    //so that output random word will not repeat
    if(previousSelectedIndex !== randomIndex){
    currentWordDisplay =  document.createElement('p');
    currentWordDisplay.innerHTML = words[randomIndex];
    //set animations
    currentWordDisplay.setAttribute("id","current-word");
    currentWordDisplay.classList.add('animated', 'bounceIn');
    circular.appendChild(currentWordDisplay);
    previousSelectedIndex = randomIndex;
} else{
    showWord(words);
    }
}

function checkWord(){
    console.log(wordInput.value);
    //even if there is spacing still okay
    wordInput.value = wordInput.value.trim();
    if (wordInput.value === currentWordDisplay.innerHTML){
        //if not 2 words stuck
        circular.removeChild(currentWordDisplay);
        showWord(wordsArray);
        wordInput.value = "";
        //whole word correct
        messageDisplay.innerHTML= "CORRECT!";
        score++;
        scoreDisplay.innerHTML= score;
        time=timeLevel+1;
    }

    else{
        //checking letter by letter if its correct
        const inputLength = wordInput.value.length;
        wordInput.style.backgroundColor = 'green';
        messageDisplay.innerHTML = "CORRECT";
        // console.log(inputLength);
        // console.log('arrayWord', currentWordDisplay.textContent);
        // console.log('typedWord', wordInput.value);

        //taking the first letter and up to the length of the word
        if(currentWordDisplay.innerHTML.slice(0,inputLength)!== wordInput.value){
            wordInput.style.backgroundColor = "red";
            messageDisplay.textContent = "WRONG!";
        }
    }
}


    //to count
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
        messageDisplay.innerHTML = "GAME OVER!!!!";
        clearInterval(timerInterval);
        //show pop
        $('#myModal').modal('show');
        highScoreRecord();


    }
}

function tryAgain(event){
    var popupId = event.target.getAttribute('id');
    if(popupId === "chooseLevelButton"){
        currentWordDisplay.innerHTML = "";
        wordInput.value = "";
        gameResults.innerHTML="LETS' GO!";
        score =0;
        scoreDisplay.innerHTML = score;
        wordInput.style.backgroundColor = 'orange';
        document.getElementById("overlay").style.display = "flex";
    }
    else if (popupId === "tryAgainButton"){
        currentWordDisplay.innerHTML="";
        wordInput.value = "";
        gameResults.innerHTML="LETS' GO!";
        score =0;
        scoreDisplay.innerHTML = score;
        wordInput.style.backgroundColor = 'orange';
        startGame();
    }
}
function chooseLevel(event){
    var buttonId = event.target.getAttribute('id'); //getting the Id
    //checking if Id is easy
    if(buttonId === "easy"){
        timeLevel=5;
        currentLevel ="easy";
    }
    else if(buttonId === "medium"){
        timeLevel = 3;
        currentLevel ="medium";
    }
    else if (buttonId === "hard"){
        timeLevel = 2;
        currentLevel ="hard";
    }
    //to remove away the overlay
    document.getElementById("overlay").style.display = "none";
    startGame();
}

function startGame(){
    // load random words from array
    showWord(wordsArray);
    //match word input don't have to press enter
    wordInput.addEventListener('keyup',checkWord);
    wordInput.focus();
    //call timer
    time=timeLevel +1;
    timerInterval = setInterval(timer,1000);

    if(currentLevel==="easy"){
        highScoreDisplay.innerHTML= highScoreEasy;
    }
    else if (currentLevel==="medium"){
        highScoreDisplay.innerHTML=highScoreMedium;
    }
    else if(currentLevel==="hard"){
        highScoreDisplay.innerHTML=highScoreHard;
    }
}

//initialize the game
function init(){
    console.log("hello initializing");
    //choosing level
    easyButton.addEventListener("click",chooseLevel);
    mediumButton.addEventListener("click",chooseLevel);
    hardButton.addEventListener("click",chooseLevel);
    tryAgainButt.addEventListener("click",tryAgain);
    chooseLevelButt.addEventListener("click",tryAgain);
}

function highScoreRecord(){
    // console.log(`Score: ${score}`);
    // console.log(`HScore: ${highScore}`);
    if(currentLevel==="easy"){
        if(score > highScoreEasy){
            // console.log("bla");
            highScoreEasy = score;
            highScoreDisplay.innerHTML= highScoreEasy;
        }
    }
    else if (currentLevel==="medium"){
        highScoreMedium = score;
        highScoreDisplay.innerHTML=highScoreMedium;
    }
    else if(currentLevel==="hard"){
        highScoreHard = score;
        highScoreDisplay.innerHTML=highScoreHard;
    }
}

window.onload = function() {
  init();
};