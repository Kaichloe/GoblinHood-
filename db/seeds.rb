# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#  // this.demoEmail = "admin_kai___activated@ggez.com"
#     // this.demoPassword = "adminkaiyip"
require 'csv'

User.destroy_all
Company.destroy_all
Transaction.destroy_all
Watchlist.destroy_all

#demoUser
kai= User.create!(email: 'admin_status_activated__welcome__back__admin_kai@wedabest.com', password: 'adminkaiyipisbackbaby', first_name: 'Kai', last_name: 'Ho', buying_power: 999999999)

csv_nasdaq = File.read(Rails.root.join('lib', 'seeds', 'nasdaq.csv'))
csv_nasdaq = CSV.parse(csv_nasdaq, :headers => true, :encoding => 'ISO-8859-1')

csv_nasdaq.each do |row|
  company = Company.create!(ticker: row['Symbol'], name: row['Name'])
end


csv_nyse = File.read(Rails.root.join('lib', 'seeds', 'nyse.csv'))
csv_nyse = CSV.parse(csv_nyse, :headers => true, :encoding => 'ISO-8859-1')

csv_nyse.each do |row|
  unless Company.find_by(ticker: row['Symbol'])
    company = Company.create!(ticker: row['Symbol'], name: row['Name'])
  end
end

csv_amex = File.read(Rails.root.join('lib', 'seeds', 'amex.csv'))
csv_amex = CSV.parse(csv_amex, :headers => true, :encoding => 'ISO-8859-1')

csv_amex.each do |row|
  unless Company.find_by(ticker: row['Symbol'])
    company = Company.create!(ticker: row['Symbol'], name: row['Name'])
  end
end