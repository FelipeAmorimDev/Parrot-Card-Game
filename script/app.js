let amountCard;
let isFirstCardTurned = false;
let cardTurnedObj = [];
let moves = 0;
const cardList = document.querySelector('.cards-board__first-list');
const closedParagrafh = document.querySelector('.game-closed');

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
  cardTurnedObj.shift() // arruma uma forma melhor para limpar o array
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

const checkWinner = () => {
  const amountCardsRight = document.querySelectorAll('.turned');
  let amountToInt = parseInt(amountCard)
  if (amountCardsRight.length === amountToInt) {
    alert(`Você ganhou em ${moves} jogadas!`)
    document.location.reload();
  }else {
    activeClick()
  }
}

function close_window() {
  if (confirm("Fechar o jogo?")) {
    closedParagrafh.innerHTML = "Jogo Finalizado, caso queira iniciar novamente apenas atualize a pagina ou digite novamente a URL!"
  }else {
    location.reload();
  }
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
  imgsCard.sort(comparador)

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
  bloco1: {
    if (!isFirstCardTurned) {
      event.currentTarget.children[0].classList.add('ocultFront')
      event.currentTarget.children[1].classList.add('showBack')
      isFirstCardTurned = true;
      cardTurnedObj.push(event.currentTarget)
    } else {
      if (event.currentTarget === cardTurnedObj[0]) {
        break bloco1;
      }
      cardTurnedObj.push(event.currentTarget)
      disableClick()
      setTimeout(() => {
        cardTurnedObj[1].children[0].classList.add('ocultFront')
        cardTurnedObj[1].children[1].classList.add('showBack') // Tem como eu criar uma referencia para
        let cardTurnClass = cardTurnedObj[0].classList[1];
        if (cardTurnedObj[1].classList.contains(cardTurnClass)) {
          cardTurnedObj[1].classList.add('turned')
          cardTurnedObj[0].classList.add('turned')
          setTimeout(checkWinner, 300)
          console.log(document.querySelectorAll('.turned'))
        } else {
          setTimeout(() => {
            turnOffCards()
          }, 1000)
        }
      }, 100)
    }
    moves++
  }
}


while (true) {
  amountCard = prompt(`Seja bem-vindo ao Parrot Card Game!

Para começar o jogo digite um número valido.
Lembrando: Apenas os valores pares de 4 a 14, incluindo ambos.

Obs:Caso queira sair escreva: Sair

Bom jogo!

`)
  amountToInt = parseInt(amountCard)

  if (!isNaN(amountToInt) || amountCard != 'Sair') {
    if ((amountToInt % 2 === 0 && amountToInt <= 14 && amountToInt > 3)) {
      let cardsRandom = generateCards(amountToInt)
      addCardBoard(cardsRandom);
      break;
    }
  }
  else {
    close_window()
    break;
  }
}

activeClick()


