// global variable
let time;
let timeLevel;
let score = 0;
let previousSelectedIndex;

//grab DOM elements
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#scoreGained");
const timeDisplay = document.querySelector("#secondsLeft");
const messageDisplay = document.querySelector("#gameResults");
const circular = document.querySelector("#circular");
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
        scoreDisplay.innerHTML= score;
        score++;
        time=timeLevel+1;
    }

    else{
        //checking letter by letter if its correct
        const inputLength = wordInput.value.length;
        wordInput.style.backgroundColor = 'green';
        messageDisplay.innerHTML = "CORRECT";
        console.log(inputLength);
        console.log('arrayWord', currentWordDisplay.textContent);
        console.log('typedWord', wordInput.value);

//taking the first letter and up to the length
    if(currentWordDisplay.innerHTML.slice(0,inputLength)!== wordInput.value){
        wordInput.style.backgroundColor = "red";
        messageDisplay.textContent = "WRONG!";
    }
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
        messageDisplay.innerHTML = "GAME OVER!!!!";
        score=-1;
    }
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
    showWord(wordsArray);
    //match word input
    wordInput.addEventListener('keyup',checkWord);
    wordInput.focus();
    //call timer
    time=timeLevel +1;
    setInterval(timer,1000);
}

//initialize the game
function init(){
    console.log("hello initializing");
    //choosing level
    easyButton.addEventListener("click",chooseLevel);
    mediumButton.addEventListener("click",chooseLevel);
    hardButton.addEventListener("click",chooseLevel);
}

window.onload = function() {
  init();
};