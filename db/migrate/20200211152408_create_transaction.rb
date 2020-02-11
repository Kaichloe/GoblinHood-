class CreateTransaction < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.integer :copmany_id, null: false
      t.float :purchase_price, null: false
      t.integer :quantity, null: false
      t.integer :average_per_share, null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
    add_index :transactions, :user_id, unique: true 
    add_index :transactions, :company_id, unique: true 
  end
end
