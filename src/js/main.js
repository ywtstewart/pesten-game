"use strict"

const cards = [],
  players = [],
  deelStapel = [],
  aflegStapel = [],
  winner = [],
  values = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ],
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

class Card {
  constructor(number = '', suit = '') {
    this.number = number;
    this.suit = suit;
  }

  get suitType() {
    return this.getSuitType();
  }

  get suitColor() {
    return this.getSuitColor();
  }

  get cardNumber() {
    return this.number;
  }

  get toString() {
    return '' + this.getSuitType() + ' ' + this.number;
  }

  getSuitType() {
    return this.suit["type"];
  }

  getSuitColor() {
    return this.suit["color"];
  }

}

class Player {
  constructor(name = '', cards = []) {
    this.name = name;
    this.cards = cards;
  }

  get getCards() {
    return this.cards;
  }

  get cardSum() {
    return this.getCardsString()
  }

  set set(cards) {
    this.cards = cards;
  }

  get getName() {
    return this.name;
  }

  getCardsString() {
    let string = '';
    for (let card in this.cards) {
      string += this.cards[card].suitType + ' ' + this.cards[card].cardNumber + '  '
    }
    return string;
  }

}



function getPlayersNames() {
  let playersString = '';
  for (let player in players) {

    if (player < players.length - 1) {
      playersString += players[player].getName;
      playersString += ', ';

    } else {
      playersString += players[player].getName;
    }

  }
  return playersString;
}





function log(message) {
  document.write('<p>' + message + '</p>');
}

function matchSuitColor(cards1) {
  for (let card in cards1) {
    if (cards1[card].suitColor == aflegStapel[aflegStapel.length - 1].suitColor) {
      return [cards1[card], card];
    } else {
      return false;
    }
  }
}



function matchCardNumber(cards1) {
  for (let card in cards1) {
    if (cards1[card].cardNumber == aflegStapel[aflegStapel.length - 1].cardNumber) {
      return [cards1[card], card];
    } else {
      return false;
    }
  }
}

function createCards() {
  for (let suit in suits) {
    for (let value in values) {
      let card = new Card(values[value], suits[suit])
      cards.push(card);
    }
  }
}

function createPlayers() {
  for (let person in people) {
    let player = new Player(people[person])
    players.push(player)
  }
}

function shuffleCards(cards) {
  cards.sort(function() {
    return 0.5 - Math.random()
  })
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



function initGame() {
  log('The game has been started with ' + getPlayersNames())
  createCards();
  createPlayers();
  shuffleCards(cards);
  dealCards();
  setTopCard();
}


function playGame() {
  let i = 0;

  do {
    i++
    if (i == players.length) {
      i = 0;
    }

    let suitColorMatch = matchSuitColor(players[i].getCards, aflegStapel[aflegStapel.length - 1]);
    let cardNumberMatch = matchCardNumber(players[i].getCards, aflegStapel[aflegStapel.length - 1]);

    if (typeof cardNumberMatch != 'boolean') {
      aflegStapel.push(cardNumberMatch[0]);
      players[i].cards.splice(cardNumberMatch[1], 1);
      log(players[i].getName + ' played ' + cardNumberMatch[0].toString);

    } else if (typeof suitColorMatch != 'boolean') {
      aflegStapel.push(suitColorMatch[0]);
      players[i].cards.splice(suitColorMatch[1], 1);
      log(players[i].getName + ' played ' + suitColorMatch[0].toString);

    } else if (typeof suitColorMatch == 'boolean' && typeof cardNumberMatch == 'boolean') {
      players[i].cards.push(deelStapel[0]);
      deelStapel.splice(0, 1);
      log(players[i].getName + ' does not have a suitable card, taking from deck ' + players[i].cards[players[i].cards.length - 1].toString);
      deelStapel.push(...aflegStapel);
      shuffleCards(deelStapel);
      aflegStapel.splice(0, aflegStapel.length);
      setTopCard();

    } else {
      log('Oops someting went wrong!')
    }

    if (players[i].getCards.length == 1) {
      log(players[i].getName + " has 1 card remaining!")
    }

    if (players[i].getCards.length == 0) {
      winner.push(players[i]);
    }

  } while (winner.length == 0)

  if (winner.length > 0) {
    log(winner[0].getName + ' has won.');
  }
}


initGame();
playGame();
