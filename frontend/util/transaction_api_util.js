export const createTransaction = transaction => {
  console.log(transaction)
  // debugger
  return $.ajax({
    method: "POST",
    url: `api/transactions/`,
    data: {transaction}
  })
}

