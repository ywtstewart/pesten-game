var card = {
  'color': 'r',
  'suit': 'Diamond'
}

card.prototype.getColor = function(){
  return this.color;
}

document.write(card.getColor())
