# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

#demoUser
kai= User.create!(email: 'admin_status_activated__welcome__back__admin_kai@wedabest.com', password: 'adminkaiyipisbackbaby', first_name: 'Kai', last_name: 'Ho', buying_power: 999999999)

hello= User.create!(email: 'kai@hotmail.com', password: 'password123', first_name: 'Kai', last_name: 'Ho', buying_power: 999999999)
