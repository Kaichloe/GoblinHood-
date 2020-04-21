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
  
  belongs_to :user
  after_save :portfolio_actions

  def portfolio_actions
    user = self.user
    total_portfolio_value = user.portfolio_value
    total_funds = user.buying_power
    if self.transaction_type == "BUY"
      total_portfolio_value += (self.purchase_price * self.quantity)
      total_funds -= (self.purchase_price * self.quantity)
    else
      total_portfolio_value -= (self.purchase_price * self.uantity)
      total_funds += (self.purchase_price * quantity)
    end
    user.update(portfolio_value: total_portfolio_value, buying_power: total_funds)
  end
end
