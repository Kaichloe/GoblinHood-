export const createTransaction = (transaction) => {
  return $.ajax({
    method: "POST",
    url: "api/transactions",
    data: { transaction },
  });
};

export const fetchTransactions = () => {
  return $.ajax({
    method: "GET",
    url: "api/transactions",
  });
};
