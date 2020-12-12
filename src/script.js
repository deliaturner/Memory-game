let cards = Array.from(document.querySelectorAll(".memory-card"));
const gameBoard = document.querySelector(".memory-game");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// User will open game and select a card to be flipped
function flipCard() {
  console.log(this.childNodes);
  this.childNodes[3].classList.toggle("hidden");
  this.childNodes[1].classList.toggle("hidden");
  console.log("flip the card");
  if (!hasFlippedCard) {
    // First Card Clicked
    hasFlippedCard = true;
    firstCard = this;
    // Second Card Clicked
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}
//Do the cards Match?
function checkForMatch() {
  console.log(firstCard, secondCard);
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    console.log("cards match");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.style.display = "hidden";
    secondCard.style.display = "hidden";
    firstCard.childNodes[3].style.display = "none";
    firstCard.childNodes[1].style.display = "none";
    secondCard.childNodes[3].style.display = "none";
    secondCard.childNodes[1].style.display = "none";
  } else {
    unflipCards();
  }
}
// Disable(Stop) cards from being moved
function disableCards() {}
//Cards will stay face up
function unflipCards() {
  console.log("not a match");
  setTimeout(() => {
    firstCard.childNodes[3].classList.toggle("hidden");
    firstCard.childNodes[1].classList.toggle("hidden");
    secondCard.childNodes[3].classList.toggle("hidden");
    secondCard.childNodes[1].classList.toggle("hidden");
  }, 1000);
  lockBoard = true;
  // Check for setTimeout on how to have cards flip back facedown automatically when it is not a matched pair.
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 2000);
}

// Timer display
const timer = document.getElementById("timerbutton");
let interval = setInterval(startTimer, 1000); //do the startTimer function every 1 second (1000ms)
let second = 0; //set intial time to zero
let minute = 0;
function startTimer() {
  timer.innerHTML = `${minute}mins ${second}secs`; //display on screen
  second++;
  if (second == 60) {
    minute++;
    second = 0;
  }
}

// Reset the Timer
function resetTimer() {
  clearInterval(interval); //stop the timer
  second = 0; // reset to zero
  minute = 0;
  setInterval(startTimer, 1000); //start the timer again
}

// Reset and Start Button will flip all cards back-face, reset all the variables, shuffle, append to screen, and start the timer at zero
document.getElementById("startbutton").addEventListener("click", startAndReset);
document.getElementById("resetbutton").addEventListener("click", startAndReset);
function startAndReset() {
  for (let card of cards) {
    //display all card backs
    card.style.display = "inline-block"; //display all cards
    card.childNodes[3].style.display = "inline-block"; //display backs
    card.childNodes[1].classList.add("hidden"); //hide fronts
  }
  resetBoard(); //resets the card variables
  newDeal(); //shuffle and add to screen
  resetTimer(); //stops and starts the timer at zero
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
    let randomCard = cards[randomPos];
    cards[randomPos] = cards[i];
    cards[i] = randomCard;
    console.log(randomCard, cards[i], cards);
  }
  console.log(cards);
}

function newDeal() {
  //put cards on the screen
  gameBoard.innerHTML = "";
  shuffle();
  cards.forEach((card) => {
    gameBoard.appendChild(card);
  });
}
window.addEventListener("DOMContentLoaded", (event) => {
  console.log(cards);
  newDeal();
});
cards.forEach((card) => card.addEventListener("click", flipCard));
