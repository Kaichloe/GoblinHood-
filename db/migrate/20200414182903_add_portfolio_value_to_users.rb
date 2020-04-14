class AddPortfolioValueToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :portfolio_value, :float, default: 0, null: false
  end
end
