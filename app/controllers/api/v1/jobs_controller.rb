class Api::V1::JobsController < Api::V1::BaseApiController
  def index
    render json: Job.search(params)
  end

  def create
    job = Job.new job_params
    job.save!
    render json: job
  end

  def show
    render json: Job.find(job_id)
  end

  def update
    job = Job.find(job_id)
    job.update_attributes!(job_params)
    render json: job
  end

  def destroy
    Job.find(job_id).destroy
    render json: {ok: true}
  end

  def options
    render json: {ok: true}
  end

  private
  def job_id
    params[:id]
  end

  def job_params
    params.permit(:company_name, :company_home_page, :title, :location, :description, {:tags => []})
  end
end
