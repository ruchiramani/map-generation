Rails.application.routes.draw do
  resources :queries
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to =>  "queries#index"
  post "/address_search", to: "queries#search"
#   post '/queries/form1" to: "queries#form1"
end
