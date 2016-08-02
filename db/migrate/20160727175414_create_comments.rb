class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :user, null: false
      t.string :text, null: false

      t.timestamps null: false
    end
  end
end
