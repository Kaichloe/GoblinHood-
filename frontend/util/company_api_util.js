//less than 30months button, limited to 25 per day 
export const fetchHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: "get",
    url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&interval=5&range=${range}&api_token=lqA24OYqT8Ec2Iywslqb2j1LkOULJcdcY4d1F0GDkPXvfKGGoeBqK9himIQE`
  });
};

//greater than 5days button 
export const fetchBigHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: "get",
    url: `https://api.worldtradingdata.com/api/v1/history?symbol=${symbol}&api_token=lqA24OYqT8Ec2Iywslqb2j1LkOULJcdcY4d1F0GDkPXvfKGGoeBqK9himIQE&date_from=${range}`
  });
};


