class Api::CompaniesController < ApplicationController
  def show
    @company = Company.find_by(ticker: params[:ticker].upcase)
    if @company
      render :show
    else
      render json: {}, status: :not_found
    end
  end

  def index
    @companys = company.all
  end

end

