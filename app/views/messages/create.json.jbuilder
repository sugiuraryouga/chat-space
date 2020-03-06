json.user_name @message.user.name
json.time @message.created_at.to_s
json.content @message.content
json.image @message.image.url
json.id @message.id