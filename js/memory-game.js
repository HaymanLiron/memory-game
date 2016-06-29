/**
 * Created by itc_user on 6/28/2016.
 */

function createElementWithClass(element, className){
    var newElement = document.createElement(element);
    newElement.className = className;
    return newElement;
}

function Board() {
    this.numCards = 12;
    this.cards = [];
    this.getCards = function(){
        var output = [];
        for (var i = 1; i <= this.numCards; i++){
            console.log("I am here2");
            var backImageSrc = "./images/texture.jpg";
            var frontImageSrc = "./images/" + i + ".jpg";
            //we push twice because we need two of each card!
            for (var j = 0; j < 2; j++){
                output.push(new Card(backImageSrc, frontImageSrc));
            }
        }
        //TODO: shuffle cards before you add them to the HTML
        return output;
    };
    this.cards = this.getCards();
    this.currentlySelected = [];
}

function changeImage(clickEvent) {
    console.log(clickEvent.target.backImage);
}

function Card(backImage, frontImage) {
    this.backImage = backImage;
    this.frontImage = frontImage;
    this.cardDiv = createElementWithClass("div", "memory-card");
    this.cardDiv.addEventListener("click", changeImage);
    document.body.appendChild(this.cardDiv);
}

var currentBoard = new Board();
