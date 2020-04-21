class Api::TransactionsController < ApplicationController
  before_action :require_logged_in

  def create 
    new_transaction = Transaction.new(trans_params)
    transaction_user_id = current_user.id
    transactions = current_user.transactions

    if new_transaction.save!
      if new_transaction.transaction_type == "BUY"
        updateBuyPower = current_user.buying_power - (new_transaction.purchase_price * new_transaction.quantity)
        updatePortValue = current_user.portfolio_value + (transactio.purchase_price * new_transaction.quantity)
      elsif new_transaction.tranaction_type == "SELL"
        updateBuyPower = current_user.buy_power + (new_transaction.purchase_price * transation.quantity)
        updatePortValue = current.user.portfolio_value - (new_transaction.purchase_price * new_transaction.quantity)
      end

      current_user.update!(buying_power: updateBuyPower, portfolio_value: updatePortValue. transactions: transactions.push(new_transaction))
    else 
      render json: new_transaction.errors.full_messages, status: 422
  end

  private

  def trans_params
    params.require(:transaction).permit(:ticker, :purchase_price, :quantity, :transaction_type)
  end

end