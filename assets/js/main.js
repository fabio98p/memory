// flip card source https://codepen.io/mondal10/pen/WNNEvjV
let htmlCards = ''
const cards = []
let firstCard

class Card {
	constructor(id, typeId, link, name) {
		this.id = id
		this.typeId = typeId
		this.link = link
		this.name = name
	}
}

const cardsType = [
	{
		id: 1,
		link: 'balloon',
		name: 'balloon'
	},
	{
		id: 2,
		link: 'bicycle',
		name: 'Bicycle'
	},
	{
		id: 3,
		link: 'ship',
		name: 'Ship'
	},
	{
		id: 4,
		link: 'submarin',
		name: 'Submarin'
	},
	{
		id: 5,
		link: 'tractor',
		name: 'Tractor'
	},
	{
		id: 6,
		link: 'tram',
		name: 'Tram'
	}
]

let counter = 0
cardsType.forEach(card => {
	cards.push(new Card(counter++, card.id, card.link, card.name))
	cards.push(new Card(counter++, card.id, card.link, card.name))
})

shuffle(cards)
cards.forEach(card => {
	htmlCards = `${htmlCards}
    <div class="scene scene--card">
        <div class="card ${card.name} ${card.name}${card.id}" onclick="selectCard('${encodeURIComponent(JSON.stringify(card))}')">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back ${card.link}">
                <div class="name">${card.name}</div>
            </div>
        </div>
    </div>
  `
})
document.getElementById('cards').innerHTML = htmlCards

let endGame = false
let timeCounter = 0
function timer() {
	setInterval(() => {
		if (!endGame) {
			document.getElementById('time').innerHTML = `Time= ${timeCounter}s`
			timeCounter++
		}
	}, 1000)
}

let timerIsStarted = false
let score = 0
let waitTheAnimation = false
function selectCard(card) {
    if (!waitTheAnimation) {
        if (!timerIsStarted) {
            timer()
            timerIsStarted = true
        }
		card = JSON.parse(decodeURIComponent(card))
		if (!hasClass(`${card.name}${card.id}`, 'active')) {
			if (!firstCard) {
				//flip the first card and set firstCard
				firstCard = card
				addClassByClass(`${card.name}${card.id}`, 'is-flipped')
			} else {
				//if exsist firstCard
				if (firstCard.id != card.id) {
					//if is not the same card
					if (firstCard.typeId == card.typeId) {
						//if is the correct card
						addClassByClass(card.name, 'active')
						addClassByClass(`${card.name}${card.id}`, 'is-flipped')
						firstCard = null
						document.getElementById('score').innerHTML = `Score= ${++score}`
						if (score == 6) {
							endGame = true
							document.getElementsByClassName('hide')[0].classList.remove('hide')
						}
					} else {
						// if is not the corret card
						addClassByClass(`${card.name}${card.id}`, 'is-flipped')
                        waitTheAnimation = true
						setTimeout(() => {
							removeClassByClass(`${card.name}${card.id}`, 'is-flipped')
							removeClassByClass(`${firstCard.name}${firstCard.id}`, 'is-flipped')
							firstCard = null
                            waitTheAnimation= false
						}, 1000)
                    }
				} else {
					//if is the same card
					// document.getElementsByClassName(`${card.name}${card.id}`)[0].classList.remove('is-flipped')
					// firstCard = null
				}
			}
		}
	}
}

function addClassByClass(oldClass, newClass) {
	let els = document.getElementsByClassName(`${oldClass}`)
	Array.prototype.forEach.call(els, function (el) {
		el.classList.add(`${newClass}`)
	})
}

function removeClassByClass(oldClass, newClass) {
	let els = document.getElementsByClassName(`${oldClass}`)
	Array.prototype.forEach.call(els, function (el) {
		el.classList.remove(`${newClass}`)
	})
}

function hasClass(oldClass, newClass) {
	return document.getElementsByClassName(`${oldClass}`)[0].classList.contains(`${newClass}`)
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}

	return array
}
