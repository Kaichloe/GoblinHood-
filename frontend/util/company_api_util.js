
export const fetchHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: "get",
    url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&interval=60&range=${range}&api_token=lqA24OYqT8Ec2Iywslqb2j1LkOULJcdcY4d1F0GDkPXvfKGGoeBqK9himIQE`
  });
};


