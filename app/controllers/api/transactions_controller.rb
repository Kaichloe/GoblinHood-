# class Api::TransactionsController < ApplicationController

#   def show
#     @transaction = Company.find_by(ticker: params[:ticker])
#     render :show
#   end

#   def create 
    
#     @transaction = Transaction.new(trans_params)
#     @transaction.user_id = current_user.id
#     transactions = current_user.transactions

#     if @transaction.save!
#       if @transaction.transaction_type == "BUY"
#         updateBuyPower = current_user.buying_power - (@transaction.purchase_price * @transaction.quantity)
#         updatePortValue = current_user.portfolio_value + (@transaction.purchase_price * @transaction.quantity)
#       else
#         updateBuyPower = current_user.buying_power + (@transaction.purchase_price * @transaction.quantity)
#         updatePortValue = current.user.portfolio_value - (@transaction.purchase_price * @transaction.quantity)
#       end

#       current_user.update!(buying_power: updateBuyPower, portfolio_value: updatePortValue, transactions: transactions.push(@transaction))
#       render :show
#     else 
#       render json: @transaction.errors.full_messages, status: 422
#     end
#   end

#   def index
#       if current_user
#         @transactions = current_user.transactions
#         render :index
#       else
#         render json: @transactions.errors.full_messages, status: 401
#     end
#   end

#   private

#   def trans_params
#     params.require(:transaction).permit(:user_id, :ticker, :purchase_price, :quantity, :transaction_type)
#   end

# end

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