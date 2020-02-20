# README
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false,unique: true|
|password|string|null: false|
|name|string|null: false|
### Association
-  has_many :messages
-  has_many :users_groups
-  has_many :groups, through: :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|
### Association
-  has_many :messages
-  has_many :users_groups
-  has_many :users, through: :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-  belongs_to :user
-  belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-  belongs_to :user
-  belongs_to :group


