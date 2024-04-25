# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# Create users
User.create([
  { username: 'admin', password: 'testing1234', email: 'admin@railsapp.com' },
  { username: 'testuser', password: 'testing1234', email: 'test@railsapp.com' }
])

# Create publishers by users
100.times do
  user = User.find_by(id: rand(User.count))

  Publisher.create(
    name: Faker::Book.publisher, 
    description: Faker::Lorem.paragraph,
    creator: user, 
    updater: user
  )
end

# Create books by users
100.times do
  user = User.find_by(id: rand(User.count))
  publisher = Publisher.find_by(id: rand(Publisher.count))

  Book.create(
    name: Faker::Book.title, 
    abstract: Faker::Books::Lovecraft.sentence,
    price: rand(15..90),
    isbn: Faker::Code.isbn,
    is_published: Faker::Boolean.boolean(true_ratio: 0.8),
    year_published: Faker::Date.between_expect(from: 40.year.ago, to: 0.year.from_now, excepted: Date.today).year,
    publisher: publisher,
    creator: user, 
    updater: user
  )
end

# Create authors by users
100.times do
  user = User.find_by(id: rand(User.count))

  books = Book.find(Book.ids.sample(5))

  Author.create(
    name: Faker::Book.author, 
    description: Faker::Lorem.paragraph,
    creator: user, 
    updater: user,
    books: books
  )
end
