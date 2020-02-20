
export const fetchNews =() => {
  return $.ajax({
    method: "get",
    url:`https://newsapi.org/v2/everything?q=stocks&pageSize=7&apiKey=825e21b97700434ba40c7e1c9bd92627`
  })
}
