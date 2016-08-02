class Api::V1::BaseApiController < ApplicationController
  rescue_from Exception do |exception| 
    render_error error: exception.message
  end

  rescue_from ActiveRecord::RecordNotFound, :with => :render_record_missing

  def render_404      
    render_error error:'The resource does not exist', code:404
  end

  def render_record_missing
    render_error error:'The record is missing', code:404
  end

  def render_error error:'Something went wrong', code:400
    render json: {ok: false, message: error}, :status => code
  end

end
