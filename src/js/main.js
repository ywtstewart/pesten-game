"use strict";
import Player from "./player";
import Card from "./card";

const cards = [],
    players = [],
    deelStapel = [],
    aflegStapel = [],
    winner = [],
    values = ["1","2","3","4","5","6","7","8","9","10","J","Q","K"],
    suits = [
      {
        "type": "\u2660",
        "color": 1
      }, {
        "type": "\u2663",
        "color": 1
      }, {
        "type": "\u2665",
        "color": 2
      }, {
        "type": "\u2666",
        "color": 2
      }
    ],
    people = ["Alice", "Bob", "Carol", "Jay"];


function write(data) {
  document.write(data);
}

function log(message) {
  write('<p>' + message + '</p>');

}

function logPlayed(name, card) {
  write('<p>' + name + ' played ' + card + '</p>');
}

function matchSuitColor(cards1) {
  for (let card in cards1) {
    if (cards1[card].suitColor === aflegStapel[aflegStapel.length - 1].suitColor) {
      return [cards1[card], card];
    }
  }
}

function matchCardNumber(cards1) {
  for (let card in cards1) {
    if (cards1[card].cardNumber === aflegStapel[aflegStapel.length - 1].cardNumber) {
      return [cards1[card], card];
    }
  }
}

function createCards() {
  for (let suit in suits) {
    for (let value in values) {
      let card = new Card(values[value], suits[suit]);
      cards.push(card);
    }
  }
}

function createPlayers() {
  for (let person in people) {
    let player = new Player(people[person]);
    players.push(player)
  }
}

function shuffleCards(cards) {
  cards.sort(function() {
    return 0.5 - Math.random()
  });
  return cards;
}

function dealCards() {
  for (let player in players) {
    for (let i = 0; i < 7; i++) {
      let rndm = Math.floor((Math.random() * 7) + 1);
      players[player].cards.push(cards[rndm]);
      cards.splice(rndm, 1);
    }
    log(players[player].getName + ' has been dealt: ' + getPlayerCards(players[player].getCards));
  }

  deelStapel.push(...cards);

}

function getPlayerCards(cards) {
  let cardsString = ' ';
  for (let card in cards) {
    cardsString += cards[card].toString;
    cardsString += ' - ';

  }
  return cardsString;
}

function setTopCard() {
  aflegStapel.push(deelStapel[0]);
  deelStapel.splice(0, 1);
  log('Top Card is: ' + aflegStapel[0].toString);

}

function getPlayersNames() {
  let playersString = '';
  if (players) {
    for (let player in players) {
      playersString += players[player].getName;
      if (player < players.length - 1) {
        playersString += ', '
      }
    }
  }
  return playersString;
}

function initGame() {
  createCards();
  createPlayers();
  shuffleCards(cards);
  let playerNames = getPlayersNames();
  log('The game has been started with ' + playerNames);
  dealCards();
  setTopCard();
  playGame();
}

function playGame() {
  let i = 0;

  do {
    i++;

    if (i === players.length) {
      i = 0;
    }

    let suitColorMatch = matchSuitColor(players[i].getCards, aflegStapel[aflegStapel.length - 1]);
    let cardNumberMatch = matchCardNumber(players[i].getCards, aflegStapel[aflegStapel.length - 1]);

    if (typeof cardNumberMatch !== 'boolean') {
      aflegStapel.push(cardNumberMatch[0]);
      players[i].cards.splice(cardNumberMatch[1], 1);
      logPlayed(players[i].getName, cardNumberMatch[0].toString);

    } else if (typeof suitColorMatch !== 'boolean') {
      aflegStapel.push(suitColorMatch[0]);
      players[i].cards.splice(suitColorMatch[1], 1);
      logPlayed(players[i].getName, suitColorMatch[0].toString);

    } else if (typeof suitColorMatch === 'boolean' && typeof cardNumberMatch === 'boolean') {
      let nextCard = deelStapel[0].toString || '';
      log(players[i].getName + ' does not have a suitable card, taking from deck ' + nextCard);
      players[i].cards.push(deelStapel[0]);
      deelStapel.splice(0, 1);

      deelStapel.push(...aflegStapel);
      shuffleCards(deelStapel);
      aflegStapel.splice(0, aflegStapel.length);
      setTopCard();

    } else {
      log('Oops someting went wrong!')
    }

    if (players[i].getCards.length === 1) {
      log(players[i].getName + " has 1 card remaining!")
    }

    if (players[i].getCards.length === 0) {
      winner.push(players[i]);
    }

  } while (winner.length === 0);

  if (winner.length > 0) {
    log(winner[0].getName + ' has won.');
  }
}

initGame();
