class IdeasController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Idea.all
  end

  def show
    render json: Idea.find(params["id"])
  end

  def create
    render json: Idea.create(params["idea"])
  end

  def delete
    render json: Idea.delete(params["id"])
  end

  def update
    render json: Idea.update(params["id"], params["idea"])
  end
end
