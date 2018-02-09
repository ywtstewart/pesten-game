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

export default Card;
