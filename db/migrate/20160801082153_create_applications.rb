class CreateApplications < ActiveRecord::Migration
  def change
    create_table :applications do |t|
      t.string :user, null: false
      t.string :cover_letter, null: false

      t.timestamps null: false
    end
  end
end
