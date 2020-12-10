let cards = Array.from(document.querySelectorAll('.memory-card'));
const gameBoard = document.querySelector(".memory-game")
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// User will open game and select a card to be flipped
function flipCard() {
    console.log(this.childNodes)
    this.childNodes[3].classList.toggle('hidden');
    this.childNodes[1].classList.toggle("hidden");
    console.log("flip the card")
    if (!hasFlippedCard) {
        // First Card Clicked
        hasFlippedCard = true;
        firstCard = this;
        // Second Card Clicked
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch()
    }
}
//Do the cards Match?
function checkForMatch() {
    console.log(firstCard, secondCard)
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        console.log('cards match')
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        unflipCards()
    }
}
// Disable(Stop) cards from being moved
function disableCards() {}
//Cards will stay face up
function unflipCards() {
    console.log("not a match")
    setTimeout(() => {
        firstCard.childNodes[3].classList.toggle('hidden');
        firstCard.childNodes[1].classList.toggle("hidden");
        secondCard.childNodes[3].classList.toggle('hidden');
        secondCard.childNodes[1].classList.toggle("hidden");
    }, 1000)
    lockBoard = true;
    // Check for setTimeout on how to have cards flip back facedown automatically when it is not a matched pair.
    // setTimeout(() => {
    //   firstCard.classList.remove('flip');
    //   secondCard.classList.remove('flip');
    //   lockBoard= false;
    // }, 2000);
}
// Board is reset to all cards being on back face
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
// cards will be shuffled each time page is reloaded
function shuffle() {
    for (i = 0; i < cards.length; i++) {
        let randomPos = Math.floor(Math.random() * 20);
        let randomCard = cards[randomPos]
        cards[randomPos] = cards[i]
        cards[i] = randomCard
        console.log(randomCard, cards[i], cards)
    }
    console.log(cards)
};

function newDeal() {
    gameBoard.innerHTML = ""
    shuffle()
    cards.forEach(card => {
        gameBoard.appendChild(card)
    })
}
window.addEventListener('DOMContentLoaded', (event) => {
    console.log(cards)
    newDeal()
});
cards.forEach(card => card.addEventListener('click', flipCard))