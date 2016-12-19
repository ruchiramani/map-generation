class Query < ApplicationRecord

  validates_presence_of  :start_lat, :start_lng, :end_lat, :end_lng

end


# Make a form for user input
# identify the input - is it a langitude/latittude or name of the place - api call
# Store the name of the place in a var to display
# send the longitude to the api to get the map with the lines
# send the longitude to the api to get the distance between each line
