class Reply < ActiveRecord::Base
  belongs_to :comment
  validates :user, :text, presence: true
end
