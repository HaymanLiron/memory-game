var cardsCurrentlyTurned = [];
var pairsFound = 0;
var NUM_PAIRS = 2;
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
        $('#myModal').modal('show');

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

var randOrder = shuffleNumbers(NUM_PAIRS);


var rowDiv = document.createElement("div");
rowDiv.classList.add("row-div");

for (var i = 0; i < randOrder.length; i++) {
    var div = document.createElement("div");
    for (var keys in board['cards'][randOrder[i]]) {
        div.setAttribute(keys, board['cards'][randOrder[i]][keys]);
    }
    div.setAttribute("back_src", "./images/texture.jpg");
    div.style.backgroundImage = "url(" + div.getAttribute("back_src") + ")";
    div.classList.add("memory-card");
    div.addEventListener("click", handleClickOnCard);
    rowDiv.appendChild(div);
}
document.body.appendChild(rowDiv);


