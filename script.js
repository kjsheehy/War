"use strict";

let player1Deck, player2Deck;

// Elements
const player1CardEl = document.getElementById("player1-card-played");
const player2CardEl = document.getElementById("player2-card-played");

const deal = function () {
  // Create standard deck as array of card objects
  let cards = [];
  for (let i = 2; i < 15; i++) {
    cards.push({ value: i, suit: "Hearts" });
    cards.push({ value: i, suit: "Spades" });
    cards.push({ value: i, suit: "Diamonds" });
    cards.push({ value: i, suit: "Clubs" });
  }

  // Shuffle deck array using an optimized (to O(n)) version of Fisher-Yates
  for (let x = cards.length - 1; x >= 0; x--) {
    let index = Math.floor(Math.random() * x);
    let temp = cards[x];
    cards[x] = cards[index];
    cards[index] = temp;
  }

  // Split deck array between the 2 players
  player1Deck = cards.splice(0, 26);
  player2Deck = cards;
};

deal();

let player1Card, player2Card;

// Draw the top card from each player's deck
const draw = function () {
  // Take the last (top) card from each player's deck
  player1Card = player1Deck.pop();
  player2Card = player2Deck.pop();

  // Display each player's drawn card
  player1CardEl.src = `Assets/card_${player1Card.value + player1Card.suit}.png`;
  player2CardEl.src = `Assets/card_${player2Card.value + player2Card.suit}.png`;

  compare();
};

document.getElementById("player1-deck").addEventListener("click", draw);
document.getElementById("player2-deck").addEventListener("click", draw);

// Compare the drawn cards and award both cards to the winner if applicable
const compare = function () {
  if (player1Card.value > player2Card.value) {
    console.log("Player 1 wins the battle");
    player1CardEl.classList.add("winning-card");
  } else if (player1Card.value < player2Card.value) {
    console.log("Player 2 wins the battle");
    player2CardEl.classList.add("winning-card");
  } else {
    console.log("The battle is a tie");
  }
};
