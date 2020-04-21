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
  validates :ticker, :purchase_price, :user_id, :quantity, 
  presence: true
  validates :purchase_price, :quantity, numericality: {greater_than: 0}
  validates :transaction_type, inclusion: { in: %w(BUY SELL)}
  
  belongs_to :user

end
