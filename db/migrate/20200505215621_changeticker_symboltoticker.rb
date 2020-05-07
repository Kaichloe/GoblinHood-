class ChangetickerSymboltoticker < ActiveRecord::Migration[5.2]
  def change
    remove_column :companies, :ticker_symbol
    add_column :companies, :ticker, :string, null: false
    add_index :companies, :ticker
  end
end
