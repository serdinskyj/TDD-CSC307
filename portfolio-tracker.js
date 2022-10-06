exports.Portfolio = class Portfolio {
  #portfolio = new Map();

  isEmpty() {
    return this.#portfolio.size == 0;
  }

  getNumTickers() {
    return this.#portfolio.size;
  }

  buyShares(ticker, numShares) {
    if (numShares > 0) {
      const currVal = this.getShares(ticker);
      if (currVal !== 0) {
        this.#portfolio.set(ticker, numShares + currVal);
      } else {
        this.#portfolio.set(ticker, numShares);
      }
    }
  }

  sellShares(ticker, numShares) {
    const currVal = this.getShares(ticker);
    if (currVal > numShares) {
      this.#portfolio.set(ticker, currVal - numShares);
    } else if (currVal == numShares) {
      if (currVal > 0) {
        this.#portfolio.delete(ticker);
      }
    } else {
      throw new Error("ShareSaleException");
    }
  }
  getShares(ticker) {
    const currVal = this.#portfolio.get(ticker);
    if (currVal === undefined) {
      return 0;
    }
    return currVal;
  }

  ownShares(ticker) {
    return this.#portfolio.has(ticker);
  }
};
