class Api::V1::ApplicationsController < Api::V1::BaseApiController
  def show
    render json: Application.find(application_id)
  end

  def index
    render json: Job.find(job_id).applications.order(created_at: :desc)
  end

  def create
    render json: Job.find(job_id).applications.create!(application_params)
  end

  def options
    render json: {ok: true}
  end

  private
  def job_id
    params[:job_id]
  end

  def application_id
    params[:id]
  end

  def application_params
      params.permit(:user, :cover_letter, :resume)
  end

end
