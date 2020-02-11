class CreateCompany < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :company_name, null: false
      t.string :ticker_symbol, null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
      add_index :companies, :company_name, unique: true 
      add_index :companies, :ticker_symbol, unique: true
  end
end
