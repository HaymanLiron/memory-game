/**
 * Created by itc_user on 6/28/2016.
 */

var NUM_CARDS = 12;

function createElementWithClass(element, className){
    var newElement = document.createElement(element);
    newElement.className = className;
    return newElement;
}

function createElementWithId(element, idName){
    var newElement = document.createElement(element);
    newElement.id = idName;
    return newElement;
}

function changeImage(clickEvent) {
    clickEvent.target.style.backgroundColor = "white";
    clickEvent.target.style.backgroundImage =  "url('https://s-media-cache-ak0.pinimg.com/avatars/sammy_dd_1424628161_140.jpg')";
}

for (var i = 0; i < NUM_CARDS; i++) {
    var card = createElementWithClass("div", "memory-card");
    card.id = "card" + i;
    card.addEventListener("click", changeImage);
    document.body.appendChild(card);    
}