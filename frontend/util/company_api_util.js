//less than 30months button, limited to 25 per day 
export const fetchHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: "get",
    url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&interval=5&range=${range}&api_token=Gtx3Q1nLNn6xaBl4vl6pZWI60BThrtkiJFEl5O7dVhZiAdywzcjZbEA8tAe6`
  });
};

//greater than 5days button 
export const fetchBigHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: "get",
    url: `https://api.worldtradingdata.com/api/v1/history?symbol=${symbol}&api_token=Gtx3Q1nLNn6xaBl4vl6pZWI60BThrtkiJFEl5O7dVhZiAdywzcjZbEA8tAe6&date_from=${range}`
  });
};


