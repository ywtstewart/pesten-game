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

export default Player;
