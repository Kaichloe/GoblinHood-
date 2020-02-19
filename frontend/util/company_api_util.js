// export const fetchCompanies = () =>{
//   return {
//     method: "get",
//     url: "/api/companies/"
//   };
// };

// export const fetchCompany = (ticker) => {
//   return {
//     method: "get",
//     url: `api/companies/${ticker}`
//   };
// };

export const fetchCompanyHistoricPrices = (symbol) => {
  return $.ajax({
    method: "get",
    url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&interval=60&range=5&api_token=lqA24OYqT8Ec2Iywslqb2j1LkOULJcdcY4d1F0GDkPXvfKGGoeBqK9himIQE`
  });
};
