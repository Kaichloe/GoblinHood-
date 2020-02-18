# == Schema Information
#
# Table name: companies
#
#  id            :bigint           not null, primary key
#  company_name  :string           not null
#  ticker_symbol :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Company < ApplicationRecord

  validates :company_name, :ticker_symbol, presence: true
  
  has_many :transactions

  has_many :watchlist

  has_many :shareholders,
    through: :tranactions
    source: :user

end

