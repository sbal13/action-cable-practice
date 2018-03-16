class CreateChatrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :chatrooms do |t|
      t.string :name
      t.string :password

      t.timestamps
    end
  end
end
