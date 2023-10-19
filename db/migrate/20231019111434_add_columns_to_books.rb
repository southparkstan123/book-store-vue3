class AddColumnsToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :isbn, :string
    add_column :books, :is_published, :boolean
    add_column :books, :year_published, :integer
  end
end
