

//news for both show and homepage 
export const fetchNews = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://cloud.iexapis.com/stable/time-series/news/${symbol}?range=1m&limit=4&token=sk_182c581f47a940bdbdb2661ea5101724`,
  });
}

export const fetchStockNews = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/6?token=sk_182c581f47a940bdbdb2661ea5101724`,
  })
}
