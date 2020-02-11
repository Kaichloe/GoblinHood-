# == Schema Information
#
# Table name: transactions
#
#  id                :bigint           not null, primary key
#  user_id           :integer          not null
#  company_id        :integer          not null
#  purchase_price    :float            not null
#  quantity          :integer          not null
#  average_per_share :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Transaction < ApplicationRecord

  belongs_to :user
  
  belongs_to :company_id

end
