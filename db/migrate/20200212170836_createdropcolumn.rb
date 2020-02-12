class Createdropcolumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :portfolio_value
  end
end
