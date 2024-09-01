const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const symbol_count = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const deposit = () => {
  while (true) {
    const deposit = prompt("Enter a deposit amount: ");
    const depositAmount = parseFloat(deposit);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      console.log("You entered invalid amount. Try again");
    } else {
      return depositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("You entered invalid number of lines. Try again");
    } else {
      return numberOfLines;
    }
  }
};

const bet = (deposit, lines) => {
  while (true) {
    const bet = prompt("Enter your bet on each lines: ");
    const betLine = parseFloat(bet);
    const minBalance = betLine * lines;
    if (isNaN(betLine) || betLine <= 0 || deposit < minBalance) {
      console.log("You entered invalid bet on lines. Try again");
    } else {
      return betLine;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(symbol_count)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }

  return reels;
};

const printRows = (reels) => {
  let stringRow = ' ';
  let index = 0;
  for (let i = 0; i < reels.length; i++) {
    for (const item of reels[i]) {
      stringRow += item;
      if (index != reels[0].length -1) {
        stringRow += " | ";
        index++;
      } else {
        console.log(stringRow);
        stringRow = ' ';
        index = 0;
      }
    }
  }
};

// let balance = deposit();
// const lines = getNumberOfLines();
// bet(balance, lines);
const reels = spin();
printRows(reels);
