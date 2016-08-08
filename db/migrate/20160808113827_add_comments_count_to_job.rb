class AddCommentsCountToJob < ActiveRecord::Migration
  def change
    add_column :jobs, :comments_count, :int
  end
end
