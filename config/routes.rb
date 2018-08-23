Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  delete '/users/:id', to: 'users#delete'
  put '/users/:id', to: 'users#update'
  get '/users/find/:name', to: 'users#showName'

  get '/ideas', to: 'ideas#index'
  get '/ideas/:id', to: 'ideas#show'
  post '/ideas', to: 'ideas#create'
  delete '/ideas/:id', to: 'ideas#delete'
  put '/ideas/:id', to: 'ideas#update'
end
