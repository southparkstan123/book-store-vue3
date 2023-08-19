require 'pagy/extras/metadata'

module Api::V1::Publisher
  class PublisherController < ApiController
    include Pagy::Backend

    before_action :authorized, except: [:list, :show, :names]

    def list
      @pagy, @publishers = pagy(Publisher.includes(:creator, :updater, :books), items: params[:per])
      render json: { data: @publishers, pagination: pagy_metadata(@pagy) }, each_serializer: PublisherSerializer
    end

    def names
      @names = Publisher.all.order(:name).map { |item| { id: item.id, name: item.name} }
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
        render json: { message: 'Error occurs!', errors: @publisher.errors.full_messages.uniq }, status: 422
      end
    end

    def update
      @publisher = Publisher.find_by(id: params[:id])
      @publisher.update(publisher_params)
      @publisher.updater = logged_in_user

      if @publisher.update(publisher_params)
        render json: { message: "Publisher \"#{@publisher.name}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @publisher.errors.full_messages.uniq }, status: 422
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

    private

    def publisher_params
      params.permit(:name, :description)
    end
  end
end
