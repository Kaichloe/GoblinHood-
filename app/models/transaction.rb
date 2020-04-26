# == Schema Information
#
# Table name: transactions
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  purchase_price   :float            not null
#  quantity         :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ticker           :string           not null
#  transaction_type :string           not null
#

class Transaction < ApplicationRecord
  validates :ticker, :purchase_price, :user_id, :purchase_price, :quantity,
  presence: true
  validates :purchase_price, :quantity, numericality: {greater_than: 0}
  validates :transaction_type, inclusion: { in: ["BUY", "SELL"]}
  validate :valid_transaction
  belongs_to :user
  after_save :portfolio_change

  def portfolio_change
    user = self.user
    total_portfolio_value = user.portfolio_value
    total_buying_power = user.buying_power
    if self.transaction_type == "BUY"
      total_portfolio_value += (self.purchase_price * self.quantity)
      total_buying_power -= (self.purchase_price * self.quantity)
    else
      total_portfolio_value -= (self.purchase_price * self.quantity)
      total_buying_power += (self.purchase_price * self.quantity)
    end
    user.update(portfolio_value: total_portfolio_value, buying_power: total_buying_power)
  end

  def valid_transaction
    stock_shares = self.user.owned_stocks[self.ticker]
    buying_power = self.user.buying_power
    transaction_total = self.purchase_price * self.quantity

    if self.transaction_type == "SELL" && (stock_shares - self.quantity < 0)
      errors[:quantity] << "You do not own enough shares to sell"
    elsif self.transaction_type == "BUY" && buying_power - transaction_total < 0
      errors[:purchase_price] << "You do not have enough funds"
    end
  end

end
