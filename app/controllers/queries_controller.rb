class QueriesController < ApplicationController
  def index
  end


  def create

    @query = Query.new(query_params)
    if @query.save
       if @query.distance_covered
         response = {start: {lat: @query.start_lat, lng: @query.start_lng}, end: {lat: @query.end_lat, lng: @query.end_lng}, distance_covered: @query.distance_covered}
       else
          response = {start: {lat: @query.start_lat, lng: @query.start_lng}, end: {lat: @query.end_lat, lng: @query.end_lng}, distance_covered: nil}
       end
        render json: response.to_json
  else
    render :json => { :errors => @query.errors.full_messages }
   end
  end


 def search
    if params[:distance_covered]
      response = {start: params[:origin], end: params[:destination], distance_covered: params[:distance_covered]}
    else
      response = {start: params[:origin], end: params[:destination]}
    end
    render json: response.to_json
 end







  private

  def query_params
    params.require(:query).permit(:start_lat, :start_lng, :end_lat, :end_lng, :distance_covered)
  end

end
