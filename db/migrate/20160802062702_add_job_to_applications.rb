class AddJobToApplications < ActiveRecord::Migration
  def change
    add_reference :applications, :job, index: true, foreign_key: true
  end
end
