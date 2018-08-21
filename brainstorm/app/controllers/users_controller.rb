class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: User.all
  end

  def show
    p params
    render json: User.find(params["id"])
  end

  def showName
    render json: User.findByName(params["name"])
  end

  def create
    render json: User.create(params["user"])
  end

  def delete
    render json: User.delete(params["id"])
  end

  def update
    render json: User.update(params["id"], params["user"])
  end
end
