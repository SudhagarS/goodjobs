Rails.application.routes.draw do
  scope 'api/v1', module: 'api/v1', format: :json do

    resources :jobs, shallow: true do
      resources :comments, shallow: true do
        resources :replies
      end
      resources :applications
    end

    match '/jobs' => "jobs#options", via: :options
    match '/jobs/:id' => "jobs#options", via: :options
    match '/jobs/:id/comments' => "comments#options", via: :options
    match '/jobs/:id/comments/:id' => "comments#options", via: :options
    match '/jobs/:id/applications' => "applications#options", via: :options
    match '/comments/:id' => "comments#options", via: :options
    match '/comments/:id/replies' => "replies#options", via: :options
    match '/replies/:id' => "replies#options", via: :options


    match '/*all' => "base_api#render_404", via: :all, constraints: { :all => /.*/ }
  end
end
