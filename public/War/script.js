"use strict";

// Variable declarations and initializations
let player1Deck, player2Deck, gameWinner, player1Card, player2Card, currentWar;
let player1Bounty = [];
let player2Bounty = [];

// DOM Elements
const player1CardEl = document.getElementById("player1-card-played");
const player2CardEl = document.getElementById("player2-card-played");
const player1scoreEl = document.getElementById("player1-score");
const player2scoreEl = document.getElementById("player2-score");
const gameOverModalEl = document.querySelector(".game-over-modal");
const winnerEl = document.querySelector(".winner");
const player1BountyEl = document.getElementById("player1-bounty");
const player2BountyEl = document.getElementById("player2-bounty");
const player1BountyCountEl = document.getElementById("player1-bounty-count");
const player2BountyCountEl = document.getElementById("player2-bounty-count");
const titleEl = document.querySelector(".title");

// Activate clickables
document.getElementById("player1-deck").addEventListener("click", draw);
document.getElementById("player2-deck").addEventListener("click", draw);
document.querySelector(".button-again").addEventListener("click", deal);
document.querySelector(".button-reset").addEventListener("click", deal);
document
  .querySelector(".button-short-game")
  .addEventListener("click", shortGame);

// Run the game
deal();

// Set up specific game scenarios to test:
//testDeal();

// All function declarations
function deal() {
  // Create standard deck as array of card objects
  let cards = [];
  for (let i = 2; i < 15; i++) {
    cards.push({ value: i, suit: "Hearts" });
    cards.push({ value: i, suit: "Spades" });
    cards.push({ value: i, suit: "Diamonds" });
    cards.push({ value: i, suit: "Clubs" });
  }

  // Shuffle deck array using an optimized (to O(n)) version of Fisher-Yates
  //console.log("before", cards.slice(0));
  for (let x = cards.length - 1; x >= 0; x--) {
    let index = Math.floor(Math.random() * x);
    //let temp = cards[x];
    //cards[x] = cards[index];
    //cards[index] = temp;
    [cards[x], cards[index]] = [cards[index], cards[x]];
  }
  //console.log("after", cards.slice(0));

  // Split deck array between the 2 players
  player1Deck = cards.splice(0, 26);
  player2Deck = cards;

  // Set DOM to initial state
  player1scoreEl.textContent = player1Deck.length;
  player2scoreEl.textContent = player2Deck.length;
  gameOverModalEl.classList.add("hidden");
  player1CardEl.classList.remove("winning-card");
  player2CardEl.classList.remove("winning-card");
  player1CardEl.classList.add("transparent");
  player2CardEl.classList.add("transparent");
  gameWinner = 0;
  clearWar();
  clearWarStyling();
  updateScores();
}

// Draw the top card from each player's deck
function draw() {
  // Don't let this run if the game is over
  if (!gameWinner) {
    // Remove winning card styling class
    player1CardEl.classList.remove("winning-card");
    player2CardEl.classList.remove("winning-card");

    if (!currentWar) clearWarStyling();

    // Take the last (top) card from each player's deck
    player1Card = player1Deck.pop();
    player2Card = player2Deck.pop();

    // Display each player's drawn card
    player1CardEl.src = `Assets/card_${
      player1Card.value + player1Card.suit
    }.png`;
    player1CardEl.classList.remove("transparent");
    player2CardEl.src = `Assets/card_${
      player2Card.value + player2Card.suit
    }.png`;
    player2CardEl.classList.remove("transparent");

    compare();
  }
}

// Compare the drawn cards, declare a winner if applicable, and put the cards in the appropriate deck(s)
function compare() {
  if (player1Card.value > player2Card.value) {
    player1CardEl.classList.add("winning-card");
    if (currentWar) {
      player1Deck = player2Bounty.concat(player1Bounty).concat(player1Deck);
      clearWar();
    }
    // Add both cards to player 1's deck
    player1Deck.unshift(player2Card, player1Card);
  } else if (player1Card.value < player2Card.value) {
    player2CardEl.classList.add("winning-card");

    if (currentWar) {
      player2Deck = player1Bounty.concat(player2Bounty).concat(player2Deck);
      clearWar();
    }
    // Add both cards to player 2's deck
    player2Deck.unshift(player1Card, player2Card);
  } else {
    war();
  }

  updateScores();

  checkForWinner();
}

function checkForWinner() {
  if (player2Deck.length < 1) {
    gameWinner = 1;
    gameOverModalEl.classList.remove("hidden");
    winnerEl.textContent = "Player 1 wins!";
  } else if (player1Deck.length < 1) {
    gameWinner = 2;
    gameOverModalEl.classList.remove("hidden");
    winnerEl.textContent = "Player 2 wins!";
  }
}

// Update player scores (number of elements in their deck array). Note that in the case of a war, the totals won't add up to 52, and that's intentional as cards currently in a war belong to neither player.
function updateScores() {
  player1scoreEl.textContent = `${player1Deck.length} cards`;
  player2scoreEl.textContent = `${player2Deck.length} cards`;
}

function war() {
  // Edge case handling:
  // If a player has no more cards after the one that resulted in a draw, that player loses.
  if (player1Deck.length === 0 || player2Deck.length === 0) checkForWinner();
  // If a player cannot put up a 3-card war bounty AND have at least one left to decide the war winner, the bounty each player puts up shrinks to the maximum size that both players can put up.
  let bountySize =
    player1Deck.length < 4
      ? player1Deck.length - 1
      : player2Deck.length < 4
      ? player2Deck.length - 1
      : 3;

  currentWar = true;
  // Add to player bounties (empty unless war within war) the card played and the 3 cards from the top of the player's deck.

  player1Bounty = bountySize
    ? player1Bounty.concat(
        [player1Card].concat(player1Deck.splice(-bountySize))
      )
    : [player1Card];
  player2Bounty = bountySize
    ? player2Bounty.concat(
        [player2Card].concat(player2Deck.splice(-bountySize))
      )
    : [player2Card];

  // Add class to style the title to indicate a war
  titleEl.classList.add("war-title");
  // Add an ! so that # of !s represents # of wars ongoing
  titleEl.textContent += "!";

  // Display the bounties
  player1BountyEl.classList.remove("hidden");
  player2BountyEl.classList.remove("hidden");

  // Show the number of cards in each player's bounty (minus the played card still displayed)
  player1BountyCountEl.textContent = player1Bounty.length - 1;
  player2BountyCountEl.textContent = player2Bounty.length - 1;
}

function clearWar() {
  currentWar = false;
  player1Bounty = [];
  player2Bounty = [];
}

function clearWarStyling() {
  player1BountyEl.classList.add("hidden");
  player2BountyEl.classList.add("hidden");
  titleEl.classList.remove("war-title");
  titleEl.textContent = "War";
}

function shortGame() {
  deal();
  player1Deck.splice(0, 21);
  player2Deck.splice(0, 21);
  updateScores();
}

// Use the below function in place of deal to create game scenarios for testing
// function testDeal() {
//   player2Deck = [
//     { value: 10, suit: "Hearts" },
//     { value: 8, suit: "Hearts" },
//   ];
//   player1Deck = [
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 7, suit: "Hearts" },
//     { value: 8, suit: "Hearts" },
//   ];

//   player1scoreEl.textContent = player1Deck.length;
//   player2scoreEl.textContent = player2Deck.length;
//   gameOverModalEl.classList.add("hidden");
//   player1CardEl.classList.remove("winning-card");
//   player2CardEl.classList.remove("winning-card");
//   player1CardEl.classList.add("hidden");
//   player2CardEl.classList.add("hidden");
//   gameWinner = 0;
//   clearWarStyling();
//   clearWar();
// }
