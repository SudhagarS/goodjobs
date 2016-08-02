class AddTagsToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :tags, :text
  end
end
