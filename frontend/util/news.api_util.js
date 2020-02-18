export const fetchNews = () => {
  return $.ajax({
    method: "get",
    url:`http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  })
}

