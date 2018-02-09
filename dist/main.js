"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cards = [],
    players = [],
    deelStapel = [],
    aflegStapel = [],
    winner = [],
    values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    suits = [{
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
}],
    people = ["Alice", "Bob", "Carol", "Jay"];

var Card = function () {
  function Card() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var suit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Card);

    this.number = number;
    this.suit = suit;
  }

  _createClass(Card, [{
    key: "getSuitType",
    value: function getSuitType() {
      return this.suit["type"];
    }
  }, {
    key: "getSuitColor",
    value: function getSuitColor() {
      return this.suit["color"];
    }
  }, {
    key: "suitType",
    get: function get() {
      return this.getSuitType();
    }
  }, {
    key: "suitColor",
    get: function get() {
      return this.getSuitColor();
    }
  }, {
    key: "cardNumber",
    get: function get() {
      return this.number;
    }
  }, {
    key: "toString",
    get: function get() {
      return '' + this.getSuitType() + ' ' + this.number;
    }
  }]);

  return Card;
}();

var Player = function () {
  function Player() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cards = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Player);

    this.name = name;
    this.cards = cards;
  }

  _createClass(Player, [{
    key: "getCardsString",
    value: function getCardsString() {
      var string = '';
      for (var card in this.cards) {
        string += this.cards[card].suitType + ' ' + this.cards[card].cardNumber + '  ';
      }
      return string;
    }
  }, {
    key: "getCards",
    get: function get() {
      return this.cards;
    }
  }, {
    key: "cardSum",
    get: function get() {
      return this.getCardsString();
    }
  }, {
    key: "set",
    set: function set(cards) {
      this.cards = cards;
    }
  }, {
    key: "getName",
    get: function get() {
      return this.name;
    }
  }]);

  return Player;
}();

function log(message) {
  document.write('<p>' + message + '</p>');
}

function matchSuitColor(cards1) {
  for (var card in cards1) {
    if (cards1[card].suitColor == aflegStapel[aflegStapel.length - 1].suitColor) {
      return [cards1[card], card];
    } else {
      return false;
    }
  }
}

function matchCardNumber(cards1) {
  for (var card in cards1) {
    if (cards1[card].cardNumber == aflegStapel[aflegStapel.length - 1].cardNumber) {
      return [cards1[card], card];
    } else {
      return false;
    }
  }
}

function createCards() {
  for (var suit in suits) {
    for (var value in values) {
      var card = new Card(values[value], suits[suit]);
      cards.push(card);
    }
  }
}

function createPlayers() {
  for (var person in people) {
    var player = new Player(people[person]);
    players.push(player);
  }
}

function shuffleCards(cards) {
  cards.sort(function () {
    return 0.5 - Math.random();
  });
  return cards;
}

function dealCards() {
  for (var player in players) {
    for (var i = 0; i < 7; i++) {
      var rndm = Math.floor(Math.random() * 7 + 1);
      players[player].cards.push(cards[rndm]);
      cards.splice(rndm, 1);
    }
    log(players[player].getName + ' has been dealt: ' + getPlayerCards(players[player].getCards));
  }

  deelStapel.push.apply(deelStapel, _toConsumableArray(cards));
}

function getPlayerCards(cards) {
  var cardsString = ' ';
  for (var card in cards) {
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
  var playersString = '';
  if (players) {
    for (var player in players) {
      playersString += players[player].getName;
      if (player < players.length - 1) {
        playersString += ', ';
      }
    }
  }
  return playersString;
}

function initGame() {
  createCards();
  createPlayers();
  shuffleCards(cards);
  var playerNames = getPlayersNames();
  log('The game has been started with ' + playerNames);
  dealCards();
  setTopCard();
}

function playGame() {
  var i = 0;

  do {
    i++;
    if (i == players.length) {
      i = 0;
    }

    var suitColorMatch = matchSuitColor(players[i].getCards, aflegStapel[aflegStapel.length - 1]);
    var cardNumberMatch = matchCardNumber(players[i].getCards, aflegStapel[aflegStapel.length - 1]);

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
      deelStapel.push.apply(deelStapel, aflegStapel);
      shuffleCards(deelStapel);
      aflegStapel.splice(0, aflegStapel.length);
      setTopCard();
    } else {
      log('Oops someting went wrong!');
    }

    if (players[i].getCards.length == 1) {
      log(players[i].getName + " has 1 card remaining!");
    }

    if (players[i].getCards.length == 0) {
      winner.push(players[i]);
    }
  } while (winner.length == 0);

  if (winner.length > 0) {
    log(winner[0].getName + ' has won.');
  }
}

initGame();
playGame();