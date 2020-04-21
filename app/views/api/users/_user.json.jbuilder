# json.extract! @user, :id, :first_name, :last_name, :buying_power,:email

json.(user, :id, :first_name, :last_name, :buying_power,:email)

json.transactions user.transactions do |transaction|
    json.id transaction.id
    json.transaction_type transaction.transaction_type
    json.ticker transaction.ticker
    json.quantity transaction.quantity
    json.purchase_price transaction.purchase_price
    json.created_at transaction.created_at 
  end