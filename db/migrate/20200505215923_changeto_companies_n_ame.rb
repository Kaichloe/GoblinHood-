class ChangetoCompaniesNAme < ActiveRecord::Migration[5.2]
  def change
    rename_column :companies, :company, :name
  end
end
