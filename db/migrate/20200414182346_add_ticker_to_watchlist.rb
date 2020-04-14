class AddTickerToWatchlist < ActiveRecord::Migration[5.2]
  def change
    add_column :watchlists, :ticker, :string, null: false 
  end
end
