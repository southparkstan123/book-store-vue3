require 'pagy/extras/headers'

module Api::V1::Publisher
  class PublisherController < ApiController
    include Pagy::Backend

    before_action :authorized, except: [:list, :show, :names]

    def list
      @publishers = Publisher.order(updated_at: :desc).includes(:books, :creator, :updater)
      @pagy, @result = pagy(@publishers, items: params[:per])
      pagy_headers_merge(@pagy)
      render json: @result
    end

    def names
      @names = Publisher.order(:name).pluck(:id, :name)
      render json:  @names
    end

    def show
      @publisher = Publisher.find_by(id: params[:id])
      if @publisher
        render json: @publisher
      else
        render json: { message: 'Publisher not found!' }, status: 404
      end
    end

    def create
      @publisher = Publisher.new(publisher_params)
      @publisher.creator = logged_in_user
      @publisher.updater = logged_in_user

      if @publisher.save
        render json: @publisher, status: :created
      else
        render json: { message: 'Error occurs!', errors: @publisher.errors.as_json(full_messages: true) }, status: 422
      end
    end

    def update
      @publisher = Publisher.find_by(id: params[:id])
      @publisher.update(publisher_params)
      @publisher.updater = logged_in_user

      if @publisher.update(publisher_params)
        render json: { message: "Publisher \"#{@publisher.name}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @publisher.errors.as_json(full_messages: true) }, status: 422
      end
    end

    def delete
      @publisher = Publisher.find_by(id: params[:id])
      if !@publisher.nil?
        Publisher.delete(params[:id])
        render json: { message: "Publisher \"#{@publisher.name}\" and its books are deleted" }
      else
        render json: { message: 'Publisher not found!' }, status: 404
      end
    end

    def dashboard
      @count = Publisher.count
      render json: { total: @count }
    end

    private

    def publisher_params
      params.permit(:name, :description)
    end
  end
end
