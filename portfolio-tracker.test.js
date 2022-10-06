const portfolioFuncs = require("./portfolio-tracker.js");

beforeEach(() => {
  portfolio = new portfolioFuncs.Portfolio();
});

afterEach(() => {
  portfolio = null;
});

test("Testing new portfolio -- fail", () => {
  const result = portfolio.getNumTickers();
  const target = 1;
  expect(target).not.toBe(result);
});

test("Testing empty/new portfolio -- success", () => {
  const result = portfolio.isEmpty();
  expect(result).toBeTruthy();
});

test("Testing empty portfolio -- fail", () => {
  const result = portfolio.isEmpty();
  expect(result).not.toBeFalsy();
});

test("Testing ticker number -- success", () => {
  portfolio.buyShares("GME", 5);
  portfolio.buyShares("RBLX", 10);
  const target = 2;
  const result = portfolio.getNumTickers();
  expect(result).toBe(target);
});

test("Testing ticker number -- fail", () => {
  portfolio.buyShares("GME", 5);
  portfolio.buyShares("UPS", 300);
  portfolio.buyShares("FORT", 1);
  expect(portfolio.isEmpty()).toBeFalsy();
});

test("Testing bought shares -- success", () => {
  portfolio.buyShares("GME", 10);
  const result = portfolio.getShares("GME");
  const target = 10;
  expect(result).toBe(target);
});

test("Testing selling some shares -- success", () => {
  portfolio.buyShares("GME", 10);
  portfolio.sellShares("GME", 5);
  const result = portfolio.getShares("GME");
  expect(result).toBe(5);
});

test("Testing selling all shares -- success", () => {
  portfolio.buyShares("GME", 10);
  portfolio.sellShares("GME", 10);
  const result = portfolio.getShares("GME");
  expect(result).toBe(0);
});
test("Testing get shares -- not available", () => {
  portfolio.buyShares("RBLX", 25);
  portfolio.buyShares("HI", 10);
  const result = portfolio.getShares("UPS");
  const target = 0;
  expect(result).toBe(target);
});

test("Testing if ticker in portfolio -- success", () => {
  portfolio.buyShares("RBLX", 20);
  portfolio.sellShares("RBLX", 19);
  const result = portfolio.ownShares("RBLX");
  expect(result).toBeTruthy();
});

test("Testing if ticker is excluded -- success", () => {
  portfolio.buyShares("RBLX", 0);
  expect(portfolio.isEmpty()).toBeTruthy();
});

test("Selling zero items from an empty stock", () => {
  portfolio.sellShares("RBLX", 0);
  expect(portfolio.ownShares("RBLX")).toBeFalsy();
});

test("Overselling a stock - Exception raised", () => {
  portfolio.buyShares("RBLX", 247);
  expect(() => {
    portfolio.sellShares("RBLX", 248);
  }).toThrowError("ShareSaleException");
});
