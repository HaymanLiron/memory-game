var cardsCurrentlyTurned = [];
var pairsFound = 0;
var NUM_PAIRS = 12;
var board = {
    cards: [
        {id:"card1", front_src: "./images/1.jpg", back_src: "./images/texture.jpg"},
        {id:"card2", front_src: "./images/2.jpg", back_src: "./images/texture.jpg"},
        {id:"card3", front_src: "./images/3.jpg", back_src: "./images/texture.jpg"},
        {id:"card4", front_src: "./images/4.jpg", back_src: "./images/texture.jpg"},
        {id:"card5", front_src: "./images/5.jpg", back_src: "./images/texture.jpg"},
        {id:"card6", front_src: "./images/6.jpg", back_src: "./images/texture.jpg"},
        {id:"card7", front_src: "./images/7.jpg", back_src: "./images/texture.jpg"},
        {id:"card8", front_src: "./images/8.jpg", back_src: "./images/texture.jpg"},
        {id:"card9", front_src: "./images/9.jpg", back_src: "./images/texture.jpg"},
        {id:"card10", front_src: "./images/10.jpg", back_src: "./images/texture.jpg"},
        {id:"card11", front_src: "./images/11.jpg", back_src: "./images/texture.jpg"},
        {id:"cardNUM_PAIRS", front_src: "./images/NUM_PAIRS.jpg", back_src: "./images/texture.jpg"}
    ]
};

function checkAllMatched(){
    if (pairsFound === NUM_PAIRS) {
        alert("Congratulations, you won!");
    }
}


function handleClickOnCard(clickEvent){
    //flip the card over for a second by changing the background image
    if (cardsCurrentlyTurned.length < 2 && clickEvent.target.style.backgroundImage === "url(\"" + clickEvent.target.getAttribute("back_src") + "\")"){
        //that if statement guarantees that a) won't show more than two cards, even if user can click quickly
        // b) doesn't do anything if the card was already flipped over

        //flip over the card:
        clickEvent.target.style.backgroundImage = "url(" + clickEvent.target.getAttribute("front_src") + ")";
        //add card to list of currently turned over
        cardsCurrentlyTurned.push(clickEvent.target);
        if (cardsCurrentlyTurned.length === 2){ //2 cards flipped, let's see if they match
            //if they match, increment the pairsFound count and reset the cards currently flipped
            if (cardsCurrentlyTurned[0].getAttribute("front_src") === cardsCurrentlyTurned[1].getAttribute("front_src")){
                pairsFound++; //global variable
                checkAllMatched();
                cardsCurrentlyTurned = [];
            } else { //if they don't match reset the cards currently flipped, and turn the cards back over after one second
                setTimeout(function(){
                    for (var i = 0; i < cardsCurrentlyTurned.length; i++){
                        cardsCurrentlyTurned[i].style.backgroundImage = "url(" + clickEvent.target.getAttribute("back_src") + ")";
                    }
                    cardsCurrentlyTurned = [];
                }, 500);
            }
        }
    }
}

function shuffleNumbers(n) {
    //this function creates a list of 2*n numbers in a shuffled order
    //where each number (0 through to (N-1)) appears exactly twice
    //agreed that it can be written WAY more efficiently
    var output = [];
    while (output.length < n * 2){
        var ranNum = Math.floor(Math.random()*NUM_PAIRS);
        while (output.lastIndexOf(ranNum) !== -1 && output.lastIndexOf(ranNum) !== output.indexOf(ranNum) ){
            ranNum = Math.floor(Math.random()*NUM_PAIRS);
        }
        output.push(ranNum);
    }
    return output;
}

var randOrder = shuffleNumbers(NUM_PAIRS);

for (var i = 0; i < randOrder.length; i++){
    var div = document.createElement("div");
    for (var keys in board['cards'][randOrder[i]]){
        div.setAttribute(keys, board['cards'][randOrder[i]][keys]);
    }
    div.style.backgroundImage = "url(" + div.getAttribute("back_src") + ")";
    div.classList.add("memory-card");
    div.addEventListener("click", handleClickOnCard);
    document.body.appendChild(div);
}

