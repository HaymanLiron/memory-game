var cardsCurrentlyTurned = [];
var pairsFound = 0;
var NUM_PAIRS = 4;
var cardBack = "./images/texture.jpg";
var screenBackground = "";
var username = "";

var board = {
    cards: [
        {front_src: "./images/1.jpg"},
        {front_src: "./images/2.jpg"},
        {front_src: "./images/3.jpg"},
        {front_src: "./images/4.jpg"},
        {front_src: "./images/5.jpg"},
        {front_src: "./images/6.jpg"},
        {front_src: "./images/7.jpg"},
        {front_src: "./images/8.jpg"},
        {front_src: "./images/9.jpg"},
        {front_src: "./images/10.jpg"},
        {front_src: "./images/11.jpg"},
        {front_src: "./images/12.jpg"}
    ]
};

function checkAllMatched() {
    if (pairsFound === NUM_PAIRS) {
        $('#endMessage').modal('show');
    }
}

function checkTwoCardsEqual(clickEvent) {
    if (cardsCurrentlyTurned[0].getAttribute("front_src") === cardsCurrentlyTurned[1].getAttribute("front_src")) {
        pairsFound++; //global variable
        checkAllMatched();
        cardsCurrentlyTurned = [];
    } else { //if they don't match reset cardsCurrentlyTurned, and turn the cards back over after one second
        setTimeout(function () {
            for (var i = 0; i < cardsCurrentlyTurned.length; i++) {
                cardsCurrentlyTurned[i].style.backgroundImage = "url(" + clickEvent.target.getAttribute("back_src") + ")";
            }
            cardsCurrentlyTurned = [];
        }, 500);
    }
}

function handleClickOnCard(clickEvent) {
    //flip the card over for a second by changing the background image

    if (cardsCurrentlyTurned.length < 2 && clickEvent.target.style.backgroundImage === "url(\"" + clickEvent.target.getAttribute("back_src") + "\")") {
        //that if statement guarantees that a) won't show more than two cards, even if user can click quickly
        // b) doesn't do anything if the card was already flipped over

        //flip over the card:
        clickEvent.target.style.backgroundImage = "url(" + clickEvent.target.getAttribute("front_src") + ")";
        //add card to list of currently turned over
        cardsCurrentlyTurned.push(clickEvent.target);
        if (cardsCurrentlyTurned.length === 2) { //2 cards flipped, let's see if they match
            //if they match, increment the pairsFound count and reset the cards currently flipped
            checkTwoCardsEqual(clickEvent);
        }
    }
}

function shuffleNumbers(n) {
    //this function creates a list of 2*n numbers in a shuffled order
    //where each number (0 through to (N-1)) appears exactly twice
    //agreed that it can be written WAY more efficiently
    var output = [];
    while (output.length < n * 2) {
        var ranNum = Math.floor(Math.random() * NUM_PAIRS);
        while (output.lastIndexOf(ranNum) !== -1 && output.lastIndexOf(ranNum) !== output.indexOf(ranNum)) {
            ranNum = Math.floor(Math.random() * NUM_PAIRS);
        }
        output.push(ranNum);
    }
    return output;
}

function clearBoard() {
    var rowsOfCards = document.getElementsByClassName("row-div");
    for (var i = 0; i < rowsOfCards.length; i++) {
        rowsOfCards[i].parentElement.removeChild(rowsOfCards[i]);
    }
}

function createBoard() {
    //clear board of any previous cards in case user was already playing game
    clearBoard();
    var randOrder = shuffleNumbers(NUM_PAIRS);

    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row-div");

    for (var i = 0; i < randOrder.length; i++) {
        var div = document.createElement("div");
        for (var keys in board['cards'][randOrder[i]]) {
            div.setAttribute(keys, board['cards'][randOrder[i]][keys]);
        }
        div.setAttribute("back_src", cardBack);
        div.style.backgroundImage = "url(" + div.getAttribute("back_src") + ")";
        div.classList.add("memory-card");
        div.addEventListener("click", handleClickOnCard);
        rowDiv.appendChild(div);
    }
    document.body.appendChild(rowDiv);
}

function getDifficultyLevel() {
    if (document.getElementById("difficultyEasy").checked){
        return 2;
    } else if (document.getElementById("difficultyMedium").checked){
        return 6;
    } else if (document.getElementById("difficultyHard").checked){
        return 12;
    }
}

function getCardTexture() {
    if (document.getElementById("texture1").checked){
        return "./images/RedDeck.png";
    } else if (document.getElementById("texture2").checked){
        return "./images/texture.jpg";
    } else if (document.getElementById("texture3").checked){
        return "./images/escher.png";
    }
}

function getScreenBackground() {
    if (document.getElementById("bgOption1").checked){
        return "./images/simpleBg.jpg";
    } else if (document.getElementById("bgOption2").checked){
        return "./images/footprints.jpg";
    } else if (document.getElementById("bgOption3").checked){
        return "./images/wolf.jpg";
    }
}

function submitSettings() {

    //GET NAME
    username = document.getElementById("userName").value;
    //set NUM_PAIRS based on difficulty selected
    NUM_PAIRS = getDifficultyLevel();
    //GET CARD TEXTURE
    cardBack = getCardTexture();
    //GET SCREEN BACKGROUND
    screenBackground = getScreenBackground();

    document.body.style.backgroundImage = "url(" + screenBackground + ")";
    document.body.style.backgroundSize = "cover";
    console.log(screenBackground);

    createBoard();
}

function quickStart(){
    //reset some global variables in case this is not first game
    cardsCurrentlyTurned = [];
    pairsFound = 0;
    createBoard();

}


function generateGame(){
    $('#settingsGame').modal('show');
}

