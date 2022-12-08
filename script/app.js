let amountCard;
let isFirstCardTurned = false;
let cardTurnedObj = [];

const cardList = document.querySelector('.cards-board__first-list')


function comparador() {
  return Math.random() - 0.5;
}

function activeClick() {
  const cards = document.querySelectorAll("li.cards-board__card-item:not(.turned)")
  cards.forEach(element => {
    element.addEventListener('click', cardClick)
  })
  isFirstCardTurned = false
  cardTurnedObj.shift()
  cardTurnedObj.shift()
}

function disableClick() {
  const cards = document.querySelectorAll("li.cards-board__card-item")
  cards.forEach(element => {
    element.removeEventListener('click', cardClick)
  })
}

function turnOffCards() {
  let firstCard = cardTurnedObj[0]
  let secondCard = cardTurnedObj[1]
  firstCard.children[0].classList.remove('ocultFront')
  firstCard.children[1].classList.remove('showBack')
  secondCard.children[0].classList.remove('ocultFront')
  secondCard.children[1].classList.remove('showBack')
  activeClick()
}

const generateCards = amountCardToAdd => {
  let amountCard = amountCardToAdd / 2
  let cardTemplate = [];
  const imgsCard = ['bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif']

  for (let i = 0; i < amountCard; i++) {
    cardTemplate.push(`<li class="cards-board__card-item item${i}"><div class="front-face face">
                      <img src="./assets/front.png" alt="" aria-hidden="true">
                      </div>
                      <div class="back-face face">
                      <img src="./assets/${imgsCard[i]}" alt="" aria-hidden="true">
                      </div>
                      </li>`)
  }

  let [...cardsClone] = cardTemplate
  cardTemplate = cardTemplate.concat(cardsClone)
  cardTemplate.sort(comparador)

  return cardTemplate
}

const addCardBoard = cardsItem => {
  let cardBoardTemplate = '';
  let cards = cardsItem
  cards.forEach(card => {
    cardBoardTemplate += card;
  });
  cardList.innerHTML = cardBoardTemplate;
}

const cardClick = (event) => {

  if (!isFirstCardTurned) {
    event.currentTarget.children[0].classList.add('ocultFront')
    event.currentTarget.children[1].classList.add('showBack')
    isFirstCardTurned = true;
    cardTurnedObj.push(event.currentTarget)
  }
  else {
    disableClick()
    cardTurnedObj.push(event.currentTarget)
    cardTurnedObj[1].children[0].classList.add('ocultFront')
    cardTurnedObj[1].children[1].classList.add('showBack') // Tem como eu criar uma referencia para

    let cardTurnClass = cardTurnedObj[0].classList[1];

    if (cardTurnedObj[1].classList.contains(cardTurnClass)) {
      cardTurnedObj[1].classList.add('turned')
      cardTurnedObj[0].classList.add('turned')
      activeClick()
    }
    else {
      setTimeout(() => {
        turnOffCards()
      }, 1000)
    }
  }

}

while (true) {
  amountCard = parseInt(prompt(`Digite a quantidade de cartas a serem geradas! 
  lembrando: De 4 a 14 cartas apenas numeros pares.`))
  if (!isNaN(amountCard)) {
    if ((amountCard % 2 === 0 && amountCard <= 14)) {
      let cardsRandom = generateCards(amountCard)
      addCardBoard(cardsRandom);
      break;
    }
  }
}

activeClick()


