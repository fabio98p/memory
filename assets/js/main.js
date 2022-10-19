// flip card source https://codepen.io/mondal10/pen/WNNEvjV
let res = ""
const cards = [] 
let firstCard

class Card {
    constructor(id, typeId, link, name) {
        this.id = id
        this.typeId = typeId
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

let counter = 0
cardsType.forEach( card => {
    cards.push(new Card(counter++, card.id, card.link, card.name))
    cards.push(new Card(counter++, card.id, card.link, card.name))
})
counter = 0 
// shuffle(cards)
cards.forEach(card => {
    // <div class="container ${card.name}" onclick="selectCard('${encodeURIComponent(JSON.stringify(card))}')">
    //     <div class="card_fix">
    //     <div class="position_name">
    //         ${card.name}
    //     </div>
    //     </div>
    //     <div class="pattern"></div>
    // </div>
    res = `${res}

    <div class="scene scene--card">
        <div class="card ${card.name} ${card.name}${card.id}" onclick="selectCard('${encodeURIComponent(JSON.stringify(card))}')">
            <div class="card__face card__face--front">image</div>
            <div class="card__face card__face--back">${card.name}</div>
        </div>
    </div>

  `
});
document.getElementById("cards").innerHTML = res

function selectCard(card){
    card = JSON.parse(decodeURIComponent(card))
    console.log(card);
    debugger
    if (!firstCard) {
        firstCard = card
        document.getElementsByClassName(`${card.name}${card.id}`)[0].classList.add('is-flipped')
    }else{
        if (firstCard.Id != card.id) {
            if(firstCard.typeId == card.typeId){
                
                var els = document.getElementsByClassName(`${card.name}`)
                Array.prototype.forEach.call(els, function(el) {
                    el.classList.add("active")
                });
            }
        }
        firstCard.typeId = null
        firstCard.Id = null
        document.getElementsByClassName(`${card.name}${card.id}`)[0].classList.remove('is-flipped')
    }
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
