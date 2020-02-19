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

export const fetchCompanyHistoricPrices = (ticker, range, interval) => {
  return $.ajax({
    method: "get",
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/?filter=date,close,label,change,changeOverTime&chartInterval=${interval}&types=quote&token=sk_1a46f435974a47cd88c7f5d8bcca1c4f`,
  });
};

export const fetchCompanyBasics = (ticker) => {
  return $.ajax({
    method:"get",
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=sk_1a46f435974a47cd88c7f5d8bcca1c4f`
  });
};