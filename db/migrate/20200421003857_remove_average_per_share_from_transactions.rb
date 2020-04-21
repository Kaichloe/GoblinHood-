class RemoveAveragePerShareFromTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :average_per_share, :integer
  end
end
