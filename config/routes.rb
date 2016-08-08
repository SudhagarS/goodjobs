Rails.application.routes.draw do
  root 'home#index'

  scope 'api/v1', module: 'api/v1', format: :json do
    resources :jobs, shallow: true do
      resources :comments, shallow: true do
        resources :replies
      end
      resources :applications
    end

    match '/*all' => "base_api#render_404", via: :all, constraints: { :all => /.*/ }
  end
end
