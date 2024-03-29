class Book < ApplicationRecord
  # validation rules
  validates :name,
            presence: { message: 'is required' },
            uniqueness: { message: '%{value} is already taken' }
  validates :abstract,
            length: { maximum: 100, too_long: "should be less than %{count} characters" },
            presence: { message: 'is required' }
  validates :price,
            presence: { message: 'is required' },
            numericality: { only_integer: false, greater_than_or_equal_to: 0 }
  validates :isbn, 
            format: { with: /\A((?:\d[\ |-]?){9}[\d|X]|(?:\d[\ |-]?){12}[\d])\z/, message: "is invalid" },
            uniqueness: { message: '%{value} is already taken' }
  validates :year_published,
            presence: { message: 'is required' },
            numericality: { only_integer: true, greater_than_or_equal_to: 1900 }
  
  # A book record can be created and updated by user
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: :created_books
  belongs_to :updater, class_name: 'User', foreign_key: :updater_id, inverse_of: :updated_books

  # A Book belongs to a publisher
  belongs_to :publisher, class_name: 'Publisher', foreign_key: :publisher_id

  # A Book belongs to many books
  has_and_belongs_to_many :authors

  scope :search_by_name, -> (string) { where("name LIKE ?", "%#{string}%") }
end
