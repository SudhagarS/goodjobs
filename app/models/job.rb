class Job < ActiveRecord::Base

  include Tire::Model::Search
  include Tire::Model::Callbacks

  has_many :comments, dependent: :destroy
  has_many :applications, dependent: :destroy

  validates :title, :company_name, :location, presence: true

  def self.search(params)
    tire.search(load:true, page: params[:page], per_page: 5) do
      query { string params[:query], default_operator: 'AND' } if params[:query].present?
      sort { by :created_at, "desc" } if params[:query].blank?
    end
  end

  serialize :tags, Array
end
