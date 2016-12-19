class CreateQueries < ActiveRecord::Migration[5.0]
  def change
    create_table :queries do |t|
      t.float   :start_lat
      t.float   :start_lng
      t.float   :end_lat
      t.float   :end_lng
      t.float   :distance_covered
      t.timestamps
    end
  end
end
