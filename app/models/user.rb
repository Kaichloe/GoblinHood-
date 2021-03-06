# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  buying_power    :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  portfolio_value :float            default(0.0), not null
#

class User < ApplicationRecord
  
  attr_reader :password

  validates :first_name, :last_name,:password_digest, :session_token, :email, presence: true
  validates :email, uniqueness: true 
  validates :password, length: { minimum: 10 }, allow_nil: true

  has_many :transactions
  has_many :watchlists

  has_many :companies,
    through: :transactions,
    source: :company

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end
  
  def owned_stocks
    owned_stocks = Hash.new(0)
    self.transactions.each do |transaction|
      if transaction.transaction_type == "BUY"
        owned_stocks[transaction.ticker] += transaction.quantity
      elsif transaction.transaction_type == "SELL"
        owned_stocks[transaction.ticker] -= transaction.quantity
      end
    end

    owned_stocks.reject! {|k| owned_stocks[k]=== 0}
    
    return owned_stocks
  end

  def owned_stocks_value
    owned_stocks_value = Hash.new(0)
    self.transactions.each do |transaction|
      if transaction.transaction_type == "BUY"
        owned_stocks_value[transaction.ticker] += (transaction.quantity * transaction.purchase_price)
      elsif transaction.transaction_type == "SELL"
        owned_stocks_value[transaction.ticker] -= (transaction.quantity * transaction.purchase_price)
      end
    end

    owned_stocks_value.reject! {|k| owned_stocks_value[k] === 0}

    return owned_stocks_value
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end


end
