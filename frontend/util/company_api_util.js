//for less than 1month
export const fetchHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}/?token=sk_182c581f47a940bdbdb2661ea5101724`
  });
};

// for greater than one month 
export const fetchBigHistoricalPrices = (symbol, range) => {
  return $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}/?token=sk_182c581f47a940bdbdb2661ea5101724`,
  });
};

export const fetchCompanyBasics = (symbol) => {
  return $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${symbol}/company/batch?&types=quote&token=sk_182c581f47a940bdbdb2661ea5101724`,
  })
};

export const fetchCompanyKeyStats = (symbol) => {
  return $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${symbol}/stats/batch?&types=quote&filter=dividendYield,peRatio,marketcap,week52high,week52low,avg10Volume&token=sk_182c581f47a940bdbdb2661ea5101724`,
  })
};



