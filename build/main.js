(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
  function Card() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var suit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Card);

    this.number = number;
    this.suit = suit;
  }

  _createClass(Card, [{
    key: 'getSuitType',
    value: function getSuitType() {
      return this.suit["type"];
    }
  }, {
    key: 'getSuitColor',
    value: function getSuitColor() {
      return this.suit["color"];
    }
  }, {
    key: 'suitType',
    get: function get() {
      return this.getSuitType();
    }
  }, {
    key: 'suitColor',
    get: function get() {
      return this.getSuitColor();
    }
  }, {
    key: 'cardNumber',
    get: function get() {
      return this.number;
    }
  }, {
    key: 'toString',
    get: function get() {
      return '' + this.getSuitType() + ' ' + this.number;
    }
  }]);

  return Card;
}();

exports.default = Card;

},{}],2:[function(require,module,exports){
"use strict";

var _player = require("./player");

var _player2 = _interopRequireDefault(_player);

var _card = require("./card");

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    people = ["Alice", "Bob", "Nina", "Jay"];

function write(data) {
  var gamefeed = document.getElementById('gamefeed');
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(data));
  gamefeed.appendChild(item);
}

function log(message) {
  write(message);
}

function logPlayed(name, card) {
  write(name + ' played ' + card);
}

function matchSuitColor(cards1) {
  for (var card in cards1) {
    if (cards1[card].suitColor === aflegStapel[aflegStapel.length - 1].suitColor) {
      return [cards1[card], card];
    }
  }
}

function matchCardNumber(cards1) {
  for (var card in cards1) {
    if (cards1[card].cardNumber === aflegStapel[aflegStapel.length - 1].cardNumber) {
      return [cards1[card], card];
    }
  }
}

function createCards() {
  for (var suit in suits) {
    for (var value in values) {
      var card = new _card2.default(values[value], suits[suit]);
      cards.push(card);
    }
  }
}

function createPlayers() {
  for (var person in people) {
    var player = new _player2.default(people[person]);
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

  deelStapel.push.apply(deelStapel, cards);
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
  playGame();
}

function playGame() {
  var i = 0;

  do {
    i++;

    if (i === players.length) {
      i = 0;
    }

    var suitColorMatch = matchSuitColor(players[i].getCards, aflegStapel[aflegStapel.length - 1]);
    var cardNumberMatch = matchCardNumber(players[i].getCards, aflegStapel[aflegStapel.length - 1]);

    if (cardNumberMatch !== false && typeof cardNumberMatch !== "undefined") {
      aflegStapel.push(cardNumberMatch[0]);
      players[i].cards.splice(cardNumberMatch[1], 1);
      logPlayed(players[i].getName, cardNumberMatch[0].toString);
    } else if (suitColorMatch !== false && typeof suitColorMatch !== "undefined") {
      aflegStapel.push(suitColorMatch[0]);
      players[i].cards.splice(suitColorMatch[1], 1);
      logPlayed(players[i].getName, suitColorMatch[0].toString);
    } else {
      var nextCard = deelStapel[0].toString || '';
      log(players[i].getName + ' does not have a suitable card, taking from deck ' + nextCard);
      players[i].cards.push(deelStapel[0]);
      deelStapel.splice(0, 1);
      deelStapel.push.apply(deelStapel, aflegStapel);
      shuffleCards(deelStapel);
      aflegStapel.splice(0, aflegStapel.length);
      setTopCard();
    }

    if (players[i].getCards.length === 1) {
      log(players[i].getName + " has 1 card remaining!");
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

},{"./card":1,"./player":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cards = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Player);

    this.name = name;
    this.cards = cards;
  }

  _createClass(Player, [{
    key: 'getCardsString',
    value: function getCardsString() {
      var string = '';
      for (var card in this.cards) {
        string += this.cards[card].suitType + ' ' + this.cards[card].cardNumber + '  ';
      }
      return string;
    }
  }, {
    key: 'getCards',
    get: function get() {
      return this.cards;
    }
  }, {
    key: 'cardSum',
    get: function get() {
      return this.getCardsString();
    }
  }, {
    key: 'set',
    set: function set(cards) {
      this.cards = cards;
    }
  }, {
    key: 'getName',
    get: function get() {
      return this.name;
    }
  }]);

  return Player;
}();

exports.default = Player;

},{}]},{},[2]);
