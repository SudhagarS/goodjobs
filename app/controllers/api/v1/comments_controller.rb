class Api::V1::CommentsController < Api::V1::BaseApiController
  def show
    render json: Comment.find(comment_id)
  end

  def index
    render json: Job.find(job_id).comments
  end

  def create
    comment = Job.find(job_id).comments.create!(comment_params)
    render json: comment
  end

  def update
    raise Exception('ola')
    comment = Comment.find comment_id
    comment.update_attributes!(comment_update_params)
    render json: comment
  end

  def destroy
    Comment.find(comment_id).destroy
    render json: {ok: true}
  end

  def options
    render json: {ok: true}
  end

  private
  def job_id
    params[:job_id]
  end

  def comment_id
    params[:id]
  end

  def comment_params
      params.permit(:user, :text)
  end

  def comment_update_params
      params.permit(:text)
  end
end
