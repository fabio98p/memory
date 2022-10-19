let res = ""
const cards = [] 
var firstId
class Card {
    constructor(id, link, name) {
        this.id = id
        this.link = link;
        this.name = name;
    }
}
const cardsType = [
    {
        "id": 1,
        "link": "baloon.png",
        "name": "baloon"
    },
    {
        "id": 2,
        "link": "bicycle.png",
        "name": "Bicycle"
    },
    {
        "id": 3,
        "link": "ship.png",
        "name": "Ship"
    },
    {
        "id": 4,
        "link": "submarin.png",
        "name": "Submarin"
    },
    {
        "id": 5,
        "link": "tractor.png",
        "name": "Tractor"
    },
    {
        "id": 6,
        "link": "tram.png",
        "name": "Tram"
    }
]
cardsType.forEach( card => {
    cards.push(new Card(card.id, card.link, card.name))
    cards.push(new Card(card.id, card.link, card.name))
})

// shuffle(cards)
cards.forEach(card => {
    res = `${res}
    <div class="container ${card.name}" onclick="selectCard(${card.id}, '${card.name}')">
        <div class="card_fix">
        <div class="position_name">
            ${card.name}
        </div>
        </div>
        <div class="pattern"></div>
    </div>
  `
});
document.getElementById("cards").innerHTML = res

function selectCard(id, name){
    debugger
    if (!firstId) {
        firstId = id
    }else{
        if(firstId == id){
            
            var els = document.getElementsByClassName(name)
            Array.prototype.forEach.call(els, function(el) {
                el.classList.add("active")
            });
        }
        firstId = null
    }
console.log(id);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
