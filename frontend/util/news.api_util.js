export const fetchNews = () => {
  return $.ajax({
    method: "get",
    url:`http://newsapi.org/v2/top-headlines?country=us&apiKey=825e21b97700434ba40c7e1c9bd92627`
  })
}

