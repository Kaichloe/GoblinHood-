# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ticker     :string           not null
#

class Company < ApplicationRecord

  validates :name, :ticker, presence: true
  
  has_many :watchlists
  has_many :users

  has_many :shareholders,
    through: :tranactions,
    source: :user

end

