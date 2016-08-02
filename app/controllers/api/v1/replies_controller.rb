class Api::V1::RepliesController < Api::V1::BaseApiController
  def create
    reply = Comment.find(comment_id).replies.create!(reply_params)
    render json: reply
  end

  def index
    render json: Comment.find(comment_id).replies
  end

  def update
    reply = Reply.find reply_id
    reply.update_attributes!(reply_params)
    render json: reply
  end

  def destroy
    Reply.find(reply_id).destroy
    render json: {ok: true}
  end

  def options
    render json: {ok: true}
  end

  private
  def comment_id
    params[:comment_id]
  end

  def reply_id
    params[:id]
  end

  def reply_params
    params.permit(:user, :text)
  end

  def reply_update_params
    params.permit(:text)
  end
end