"use strict";

const player1Deck;
const player2Deck;

const deal = function () {
  // Create standard deck as array of card objects
  let cards = [];
  for (let i = 2; i < 15; i++) {
    cards.push({ value: i, suit: "Hearts" });
    cards.push({ value: i, suit: "Spades" });
    cards.push({ value: i, suit: "Diamonds" });
    cards.push({ value: i, suit: "Clubs" });
  }

  // Shuffle deck array

  // Split deck array between the 2 players

};


