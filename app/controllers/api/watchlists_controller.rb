class Api::WatchlistsController < ApplicationController
  before_action :require_logged_in

  def create 
    watchlist = Watchlist.new(watchlist_params)
    @user = current_user 
    watchlist.user_id = current_user.id

    if watchlist.save
      render "api/users/show"
    else 
      render json: watchlist.error.full_messages
    end
  end

  def destroy
    watchlists = Watchlist.where(user_id: current_user.id)
    watchlist = watchlists.find_by(ticker: params[:ticker])
    @user = current_user
    
    if watchlist.destroy
      render "api/user/show"
    else 
      render json: ["Stock could not be unwatched"], status: 422
    end
  end

  private 

  def watchlist_params
    params.require(:stock).permit(:user_id, :ticker)
  end
end