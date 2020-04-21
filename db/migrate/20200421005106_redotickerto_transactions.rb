class RedotickertoTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :ticker
    add_column :transactions, :ticker, :string, null: false
    add_index :transactions, :ticker
  end
end
