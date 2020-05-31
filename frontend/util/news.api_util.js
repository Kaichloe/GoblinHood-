

//news for both show and homepage 
export const fetchNews = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://rocky-badlands-69033.herokuapp.com/https://newsapi.org/v2/everything?q=${symbol}&pageSize=7&apiKey=825e21b97700434ba40c7e1c9bd92627`,
  });
}
