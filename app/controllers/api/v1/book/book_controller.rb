require 'pagy/extras/headers'

module Api::V1::Book
  class BookController < ApiController
    include Pagy::Backend

    before_action :authorized, except: [:list, :show]

    def list
      @books = Book.search_by_name(params[:name]).order(updated_at: :desc).includes(:authors, :creator, :updater, :publisher)
      @pagy, @result = pagy(@books, items: params[:per])
      pagy_headers_merge(@pagy)
      render json: @result
    end

    def show
      @book = Book.find_by(id: params[:id])
      if @book
        render json: @book
      else
        render json: { message: 'Book not found!' }, status: 404
      end
    end

    def create
      @book = Book.create(book_params)
      @book.creator = logged_in_user
      @book.updater = logged_in_user

      if @book.save
        render json: { message: "Book \"#{@book.name}\" is created" , data: @book }, status: :created
      else
        render json: { message: 'Error occurs!', errors: @book.errors.as_json(full_messages: true) }, status: 422
      end
    end

    def update
      @book = Book.find_by(id: params[:id])
      @book.updater = logged_in_user
      @book.update(book_params)

      if @book.update(book_params)
        render json: { message: "Book \"#{@book.name}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @book.errors.as_json(full_messages: true) }, status: 422
      end
    end

    def delete
      @book = Book.find_by(id: params[:id])
      if !@book.nil?
        Book.delete(params[:id])
        render json: { message: "Book \"#{@book.name}\" is deleted" }
      else
        render json: { message: 'Book not found!' }, status: 404
      end
    end

    def dashboard
      @count = Book.count
      render json: { total: @count }
    end

    private

    def book_params
      params.permit(:name, :abstract, :price, :publisher_id, :isbn, :year_published, :is_published, author_ids: [])
    end

  end
end
