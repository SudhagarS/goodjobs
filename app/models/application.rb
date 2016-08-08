class Application < ActiveRecord::Base
  belongs_to :job, counter_cache: true
  validates :user, :cover_letter, :resume, presence: true

  mount_base64_uploader :resume, ResumeUploader
end
