# == Schema Information
#
# Table name: transactions
#
#  id                :bigint           not null, primary key
#  user_id           :integer          not null
#  purchase_price    :float            not null
#  quantity          :integer          not null
#  average_per_share :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  ticker            :string
#

class Transaction < ApplicationRecord
  validates :ticker, :purchase_price, :average_per_share, :user_id, :quantity,
  presence: true
  
  belongs_to :user

end
