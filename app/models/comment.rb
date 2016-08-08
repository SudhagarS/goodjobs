class Comment < ActiveRecord::Base
  belongs_to :job, counter_cache: true
  has_many :replies, dependent: :destroy

  validates :user, :text, presence: true

  def as_json(options={})
    super(
      :include => [:replies]
    )
  end
end
