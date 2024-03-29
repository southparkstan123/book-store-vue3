Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get 'greeting', to: 'message#greeting'
      namespace 'user' do
        post '/register', to: 'user#create'
        post '/login', to: 'user#login'
        get '/auto_login', to: 'user#auto_login'
      end

      namespace 'book' do
        get '/summary', to: 'book#dashboard'
        get '/list', to: 'book#list'
        get '/:id', to: 'book#show'
        post '/', to: 'book#create'
        patch '/:id', to: 'book#update'
        delete '/:id', to: 'book#delete'
      end

      namespace 'author' do
        get '/summary', to: 'author#dashboard'
        get '/list', to: 'author#list'
        get '/:id', to: 'author#show'
        get '/list/names', to: 'author#names'
        post '/', to: 'author#create'
        patch '/:id', to: 'author#update'
        delete '/:id', to: 'author#delete'
      end

      namespace 'publisher' do
        get '/summary', to: 'publisher#dashboard'
        get '/list', to: 'publisher#list'
        get '/:id', to: 'publisher#show'
        get '/list/names', to: 'publisher#names'
        post '/', to: 'publisher#create'
        patch '/:id', to: 'publisher#update'
        delete '/:id', to: 'publisher#delete'
      end

    end
  end
  root to: 'home#index'
  get '/*path', to: 'home#index'
end
