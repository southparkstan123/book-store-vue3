class BookSerializer < ApplicationSerializer
  attributes :id, :name, :price, :abstract, :isbn, :is_published, :year_published, :created_at, :updated_at

  has_many :authors, serializer: AuthorSerializer
  belongs_to :creator, serializer: UserSerializer
  belongs_to :updater, serializer: UserSerializer
  belongs_to :publisher, serializer: PublisherSerializer

  def price
    object.price.to_f
  end

  def year_published
    object.year_published.to_i
  end
  
end

