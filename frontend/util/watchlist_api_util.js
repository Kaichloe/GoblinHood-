export const watchStock = stock => {
  return $.ajax({
    method: 'POST',
    url: '/api/watchlists',
    data: {stock}
  })
}

export const unWatchStock = stock => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/watchlists/${stock.ticker}`,
  });
}
