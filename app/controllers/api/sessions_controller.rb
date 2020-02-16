class Api::SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/show"
    else
      render json: ["Unable to log in with provided credentials."], status: :unauthorized 
    end
  end

  def destroy
        @user = current_user

        if @user
            logout!
            render "api/users/show"
        else
            render json: ["No user signed in"], status: 404
        end
   end
end