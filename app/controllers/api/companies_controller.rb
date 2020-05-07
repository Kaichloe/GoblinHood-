class Api::CompaniesController < ApplicationController
  before_action :require_logged_in

  def show
    @company = Company.find_by(ticker: params[:ticker])
    if @company
      render :show
    else
      render json: {}, status: :not_found
    end
  end

  def index
    if current_user
      @companies = Company.all
      render :index
    else 
      render json: @companies.errors.full_messages, status: 401
    end
  end

  def create 
    @company = Company.new(company_params)

    if @company.save
      render :show
    else
      render json: @company.errors.full_messages, status: 401
    end
  end

  private

  def company_params
    params.require(:company).permit(:ticker, :name)
  end

end

