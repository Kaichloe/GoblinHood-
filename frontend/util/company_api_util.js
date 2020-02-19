export const fetchCompanies = () =>{
  return {
    method: "get",
    url: "/api/companies/"
  };
};

export const fetchCompany = (ticker) => {
  return {
    method: "get",
    url: `api/companies/${ticker}`
  };
};

export const fetchCompanyHistoricPrices = (ticker, interval, range) => {
  return $.ajax({
    method: "get",
    url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${ticker}&interval=${interval}&range=${range}&api_token=Gtx3Q1nLNn6xaBl4vl6pZWI60BThrtkiJFEl5O7dVhZiAdywzcjZbEA8tAe6`
  });
};
