// p5-class.js
class MemoryGame {
  constructor() {
    this.level = 1; // current round/level
    this.score = 0; // player score
    this.cards = []; // array of emojis for the current round
    this.removedCard = null; // the emoji that was removed
    this.options = []; // array of 10 emojis for guessing
  }

  startNewGame() {
    this.level = 1;
    this.score = 0;
    this.startNewRound();
  }

  startNewRound() {
    this.level++;
    const cardCount =
      this.level === 1 ? 5 : this.level === 2 ? 7 : 10 + (this.level - 3) * 3;
    this.cards = this.generateCards(cardCount);
    this.removedCard = this.removeOneCard();
    this.options = this.generateOptions();
  }

  generateCards(count) {
    const emojiPool = [
      "🍎",
      "🐶",
      "🚗",
      "🌟",
      "🎩",
      "🦄",
      "🍕",
      "🎸",
      "🏀",
      "🍔",
      "🦋",
      "🌈",
      "🚀",
      "🐱",
      "🍩",
      "🧸",
      "🐸",
      "🌹",
      "🎲",
      "🎯",
    ];
    const shuffled = emojiPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  removeOneCard() {
    const index = Math.floor(Math.random() * this.cards.length);
    const removed = this.cards.splice(index, 1)[0];
    return removed;
  }

  generateOptions() {
    const emojiPool = [
      "🍎",
      "🐶",
      "🚗",
      "🌟",
      "🎩",
      "🦄",
      "🍕",
      "🎸",
      "🏀",
      "🍔",
      "🦋",
      "🌈",
      "🚀",
      "🐱",
      "🍩",
      "🧸",
      "🐸",
      "🌹",
      "🎲",
      "🎯",
    ];
    const excluded = new Set(this.cards.concat(this.removedCard));
    const available = emojiPool.filter((e) => !excluded.has(e));
    const shuffled = available.sort(() => 0.5 - Math.random());
    const options = shuffled.slice(0, 9);
    options.push(this.removedCard);
    return options.sort(() => 0.5 - Math.random());
  }

  checkGuess(emoji) {
    if (emoji === this.removedCard) {
      this.score++;
      this.startNewRound();
      return true;
    } else {
      return false;
    }
  }

  getGameState() {
    return {
      level: this.level,
      score: this.score,
      cards: this.cards,
      options: this.options,
    };
  }
}

module.exports = { MemoryGame };
