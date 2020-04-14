class AddTickerToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :ticker, :string
  end
end
