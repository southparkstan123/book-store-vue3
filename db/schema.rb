# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_19_111434) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "creator_id"
    t.bigint "updater_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_authors_on_creator_id"
    t.index ["updater_id"], name: "index_authors_on_updater_id"
  end

  create_table "authors_books", id: false, force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "book_id"
    t.index ["author_id"], name: "index_authors_books_on_author_id"
    t.index ["book_id"], name: "index_authors_books_on_book_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "name"
    t.text "abstract"
    t.decimal "price", precision: 5, scale: 2
    t.bigint "creator_id"
    t.bigint "updater_id"
    t.bigint "publisher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "isbn"
    t.boolean "is_published"
    t.integer "year_published"
    t.index ["creator_id"], name: "index_books_on_creator_id"
    t.index ["publisher_id"], name: "index_books_on_publisher_id"
    t.index ["updater_id"], name: "index_books_on_updater_id"
  end

  create_table "publishers", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "creator_id"
    t.bigint "updater_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_publishers_on_creator_id"
    t.index ["updater_id"], name: "index_publishers_on_updater_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "authors", "users", column: "creator_id"
  add_foreign_key "authors", "users", column: "updater_id"
  add_foreign_key "books", "publishers", on_delete: :cascade
  add_foreign_key "books", "users", column: "creator_id"
  add_foreign_key "books", "users", column: "updater_id"
  add_foreign_key "publishers", "users", column: "creator_id"
  add_foreign_key "publishers", "users", column: "updater_id"
end
