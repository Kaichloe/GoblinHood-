
json.(user, :id, :first_name, :last_name, :buying_power,:email, :portfolio_value, :owned_stocks)

json.transactions user.transactions do |transaction|
    json.(transaction,:user_id, :transaction_type, :ticker, :quantity, :purchase_price, :created_at)
end

json.watchlist user.watchlists do |watchlist|
    json.id watchlist.id 
    json.user_id watchlist.user_id
    json.ticker watchlist.ticker
end
