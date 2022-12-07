let amountCard;

const cardList = document.querySelector('.cards-board__first-list')

function comparador() {
  return Math.random() - 0.5;
}

const generateCards = (amountCardToAdd) => {
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
    cardTemplate.push(`<li class="cards-board__card-item"><div class="front-face face">
<img src="./assets/front.png" alt="" aria-hidden="true">
</div>
<div class="back-face face">
<img src="./assets/${imgsCard[i]}" alt="" aria-hidden="true">
</div>
</li>`)
    cardTemplate.push(`<li class="cards-board__card-item">
<div class="front-face face">
<img src="./assets/front.png" alt="" aria-hidden="true">
</div>
<div class="back-face face">
<img src="./assets/${imgsCard[i]}" alt="" aria-hidden="true">
</div>
</li>`)
  }

  cardTemplate.sort(comparador)
  return cardTemplate
}

const addCardBoard = (cardsItem) => {
  let cardBoardTemplate = '';
  let cards = cardsItem
  cards.forEach(card => {
    cardBoardTemplate+=card;
  });
  cardList.innerHTML = cardBoardTemplate;
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

console.log(amountCard)