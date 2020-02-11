class CreateWatchlist < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :user_id, null: false
      t.integer :company_id, null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
    add_index :watchlists, :user_id, unique: true 
    add_index :watchlists, :company_id, unique: true
  end
end
