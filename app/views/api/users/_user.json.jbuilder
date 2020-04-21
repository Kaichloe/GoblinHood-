
json.(user, :id, :first_name, :last_name, :buying_power,:email, :portfolio_value)

json.transactions user.transactions do |transaction|
    json.(transaction,:user_id, :transaction_type, :ticker, :quantity, :purchase_price, :created_at)
end