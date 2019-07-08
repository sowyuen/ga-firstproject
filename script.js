window.onload = function(){
    init();;
}

// global variable
let time;
let timeLevel;
let score = 0;
let playing;

//grab DOM elements
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#scoreGained");
const timeDisplay = document.querySelector("#secondsLeft");
const messageDisplay = document.querySelector("#gameResults");
const secondShownOnTop = document.querySelector("#seconds");
const circular = document.querySelector("#circular");
var currentWordDisplay = null;
//setting animations
const secondsDisplay = document.querySelector("#secondsLeft");
secondsLeft.classList.add('animated','heartBeat','infinite');
const gameMessage =  document.querySelector('#gameResults');
gameResults.classList.add('animated', 'tada');

//buttons to choose level
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");

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
'think',
'pizzas',
'suburban',
'assuming',
'obstinance',
'foramens',
'general'
];

//initialize the game
function init(){
    console.log("hello initializing");
    //choosing level
    easyButton.addEventListener("click",chooseLevel);
    mediumButton.addEventListener("click",chooseLevel);
    hardButton.addEventListener("click",chooseLevel);
}

function chooseLevel(event){
    var buttonId = event.target.getAttribute('id'); //getting the Id
    //checking if Id is easy
    if(buttonId === "easy"){
        timeLevel=5;
    }
    else if(buttonId === "medium"){
        timeLevel = 3;
        console.log(mediumButton);
    }
    else if (buttonId === "hard"){
        timeLevel = 2;
    }
    document.getElementById("overlay").style.display = "none";
    startGame();
}

function startGame(){
    // load random words from array
    showWord(words);
    //match word input
    wordInput.addEventListener('keyup',checkWord);
    wordInput.focus();
    //call timer
    time=timeLevel +1;
    setInterval(timer,1000);

}

//To show random words
function showWord(words){
    //To generate random words
    const randomIndex = Math.floor(Math.random() * words.length);
    // console.log(randomIndex);
    //output random word
    currentWordDisplay =  document.createElement('p');
    currentWordDisplay.innerHTML = words[randomIndex];
    //set animations
    currentWordDisplay.setAttribute("id","current-word");
    currentWordDisplay.classList.add('animated', 'bounceIn');
    circular.appendChild(currentWordDisplay);

    //currentWord.style.opacity = 1;
}
function checkWord(){
    console.log(wordInput.value);
    if (wordInput.value === currentWordDisplay.innerHTML){
        //if not 2 words stuck
        circular.removeChild(currentWordDisplay);
        playing= true;
        showWord(words);
        wordInput.value = "";
        messageDisplay.innerHTML= "CORRECT!";
        score++;
        time=timeLevel+1;
        // return true;
    }
    else{
        scoreDisplay.innerHTML= score;
        messageDisplay.innerHTML="WRONG!";

    }
    // if score is -1, display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }
    else{
    scoreDisplay.innerHTML = score;
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
        playing = false;
        messageDisplay.innerHTML = "GAME OVER!!!!";
    }
}