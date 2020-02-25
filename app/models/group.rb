class Group < ApplicationRecord
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users
  validates :name, presence: true
  # unless: :image?という条件を追加しています。unlessはifの逆の役割があります。if: :image?であれば、imageカラムが空でなければという意味になりますので、unless: :image?はimageカラムが空だったらという意味です。つまり、imageカラムが空の場合、contentカラムも空であれば保存しないという意味になります。

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.content?
        last_message.content
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end
end
