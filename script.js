"use strict";

let player1Deck, player2Deck;

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

const draw = function () {
  player1Card = player1Deck.pop();
  player2Card = player2Deck.pop();

  document.getElementById("player1-card-played").src = `Assets/card_${
    player1Card.value + player1Card.suit
  }.png`;
  document.getElementById("player2-card-played").src = `Assets/card_${
    player2Card.value + player2Card.suit
  }.png`;
};

document.querySelector(".deck").addEventListener("click", draw);
