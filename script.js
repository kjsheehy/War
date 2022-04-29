"use strict";

let player1Deck, player2Deck, gameWinner;

// Elements
const player1CardEl = document.getElementById("player1-card-played");
const player2CardEl = document.getElementById("player2-card-played");
const player1scoreEl = document.getElementById("player1-score");
const player2scoreEl = document.getElementById("player2-score");
const gameOverModalEl = document.querySelector(".game-over-modal");
const winnerEl = document.querySelector(".winner");

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

  // Set DOM to initial state
  player1scoreEl.textContent = player1Deck.length;
  player2scoreEl.textContent = player2Deck.length;
  gameOverModalEl.classList.add("hidden");
  player1CardEl.classList.remove("winning-card");
  player2CardEl.classList.remove("winning-card");
  player1CardEl.classList.add("hidden");
  player2CardEl.classList.add("hidden");
  gameWinner = 0;
};

deal();

let player1Card, player2Card;

// Draw the top card from each player's deck
const draw = function () {
  // Don't let this run if the game is not over
  if (!gameWinner) {
    // Remove winning card styling class
    player1CardEl.classList.remove("winning-card");
    player2CardEl.classList.remove("winning-card");

    // Take the last (top) card from each player's deck
    player1Card = player1Deck.pop();
    player2Card = player2Deck.pop();

    // Display each player's drawn card
    player1CardEl.src = `Assets/card_${
      player1Card.value + player1Card.suit
    }.png`;
    player1CardEl.classList.remove("hidden");
    player2CardEl.src = `Assets/card_${
      player2Card.value + player2Card.suit
    }.png`;
    player2CardEl.classList.remove("hidden");

    compare();
  }
};

document.getElementById("player1-deck").addEventListener("click", draw);
document.getElementById("player2-deck").addEventListener("click", draw);
document.querySelector(".button-again").addEventListener("click", deal);
document.querySelector(".button-restart").addEventListener("click", deal);

// Compare the drawn cards, declare a winner if applicable, and put the cards in the appropriate deck(s)
const compare = function () {
  if (player1Card.value > player2Card.value) {
    //console.log("Player 1 wins the battle");
    player1CardEl.classList.add("winning-card");

    // Add both cards to player 1's deck
    player1Deck.unshift(player2Card, player1Card);
    //console.log(player1Deck);
  } else if (player1Card.value < player2Card.value) {
    //console.log("Player 2 wins the battle");
    player2CardEl.classList.add("winning-card");

    // Add both cards to player 2's deck
    player2Deck.unshift(player1Card, player2Card);
    //console.log(player2Deck);
  } else {
    //console.log("The battle is a tie");
    war();
    // For now, just put the cards back in each player's deck. Will add in the war logic later (probably with a modal).
    player1Deck.unshift(player1Card);
    player2Deck.unshift(player2Card);
  }

  function war() {
    //console.log("before splice", [...player1Deck]);
    let player1Bounty = player1Deck.splice(-3);
    let player2Bounty = player2Deck.splice(-3);
    //console.log("splice", player1Bounty);
    //console.log("after splice", [...player1Deck]);
  }

  // Check for game winner (the other player has no cards left)
  // for dev purposes, setting having < 23 cards left as a loss
  if (player2Deck.length < 1) {
    gameWinner = 1;
    // Call a function to end the game and declare a winner
    gameOverModalEl.classList.remove("hidden");
    winnerEl.textContent = "Player 1 wins!";
  } else if (player1Deck.length < 1) {
    gameWinner = 2;
    // Call a function to end the game and declare a winner
    gameOverModalEl.classList.remove("hidden");
    winnerEl.textContent = "Player 2 wins!";
  }

  // Update player scores (number of elements in their deck array)
  player1scoreEl.textContent = `${player1Deck.length} cards`;
  player2scoreEl.textContent = `${player2Deck.length} cards`;
};
