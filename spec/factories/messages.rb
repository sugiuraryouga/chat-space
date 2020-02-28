FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    
    # ~/アプリケーション名/public/images.test_image.jpgの画像をテストで用いるという意味
    # Rails.rootの意味は/Users/~~/アプリケーションまでのパスを取得しています
    user
    group
  end
end