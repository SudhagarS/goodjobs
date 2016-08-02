require File.expand_path('../boot', __FILE__)

require 'rails/all'
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Goodjobs
  class Application < Rails::Application
    config.active_record.raise_in_transactional_callbacks = true
    config.api_only = true
    config.debug_exception_response_format = :api
    config.action_dispatch.default_headers.merge!({
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Request-Method' => '*',
      'Access-Control-Allow-Headers' => 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods' => 'DELETE,GET,HEAD,POST,PUT,OPTIONS,TRACE'
    })
  end
end
require 'carrierwave/orm/activerecord'
