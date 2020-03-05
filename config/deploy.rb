# config valid only for current version of Capistrano
# capistranoのバージョンを記載。固定のバージョンを利用し続け、バージョン変更によるトラブルを防止する
lock "3.12.0"

# Capistranoのログの表示に利用する
set :application, "chat-space"

# どのリポジトリからアプリをpullするかを指定する
set :repo_url, "git@example.com:sugiuraryouga/chat-space.git"

# バージョンが変わっても共通で参照するディレクトリを指定
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1' #カリキュラム通りに進めた場合、2.5.1か2.3.1です

# どの公開鍵を利用してデプロイするか
set :ssh_options, auth_methods: ['publickey'],
                  keys:~/.ssh/sugiuraryougakey.pem

# プロセス番号を記載したファイルの場所
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの場所
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# デプロイ処理が終わった後、Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end

# DSLとは、ある特定の処理における効率をあげるために特化した形の文法を擬似的に用意したプログラムです。
# 上記のset :名前, 値について、これは言わば変数のようなものです。
# 例えばset: Name, 'value' と定義した場合、fetch Name とすることで 'Value'が取り出せます。
# また、一度setした値はdeploy.rbやproduction.rbなどの全域で取り出すことができます。また、ファイル内には、desc '◯◯'やtask:XX doといった記述がよく見受けられます。これは、先ほどCapfileでrequireしたものに加えて追加のタスクを記述している形です。ここで記述したものもcap deploy時に実行されることとなります。


