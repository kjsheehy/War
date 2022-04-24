"use strict";

//const player1Deck;
//const player2Deck;

const deal = function () {
  // Create standard deck as array of card objects
  let cards = [];
  for (let i = 2; i < 15; i++) {
    cards.push({ value: i, suit: "Hearts" });
    cards.push({ value: i, suit: "Spades" });
    cards.push({ value: i, suit: "Diamonds" });
    cards.push({ value: i, suit: "Clubs" });
  }
  console.log(cards);
  // Shuffle deck array using an optimized (to O(n)) version of Fisher-Yates
  for (let x = cards.length - 1; x >= 0; x--) {
    let index = Math.floor(Math.random() * x);
    let temp = cards[x];
    cards[x] = cards[index];
    cards[index] = temp;
  }

  // Split deck array between the 2 players
};
