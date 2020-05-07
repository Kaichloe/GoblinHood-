class ChangetoCompanies < ActiveRecord::Migration[5.2]
  def change
    rename_column :companies, :company_name, :company
  end
end
