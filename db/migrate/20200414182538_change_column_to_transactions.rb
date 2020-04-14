class ChangeColumnToTransactions < ActiveRecord::Migration[5.2]
  def change
    def change
    add_column :transactions, :ticker, :string, null: false 
  end
  end
end
