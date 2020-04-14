class RemoveCompanyIdFromTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :company_id, :integer
  end
end
