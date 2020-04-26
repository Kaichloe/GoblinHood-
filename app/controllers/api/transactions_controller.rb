
class Api::TransactionsController < ApplicationController
  before_action :require_logged_in
  
  def create
    transaction = Transaction.new(transaction_params)
    transaction.user_id = current_user.id
    if transaction.save!
      @user = User.find(current_user.id)
      render "api/users/show"
    else
      render json: transaction.errors.full_messages, status: 422
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:user_id, :ticker, :purchase_price, :quantity, :transaction_type)
  end

end