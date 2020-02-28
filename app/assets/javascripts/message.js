$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message__info">
          <div class="chat-main__messages__message__info__name">
            ${message.user_name}
          </div>
          <div class="chat-main__messages__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messages__text">
          <p class="chat-main__messages__text__content">
            ${message.content}
          </p>
        </div>
         <img src=${message.image} >
      </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message__info">
          <div class="chat-main__messages__message__info__name">
            ${message.user_name}
          </div>
          <div class="chat-main__messages__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messages__text">
          <p class="chat-main__messages__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__messages').append(html);   
    $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});   
    $('.chat-main__form__new')[0].reset();
    $('.chat-main__form__new__submit-btn').prop('disabled', false);
      // $('.form__submit').prop('disabled', false);は、 htmlの仕様でsubmitボタンを一度押したらdisabled属性というボタンが押せなく属性が追加されます。 そのため、disabled属性をfalseにする記述を追加しています
    })  
    .fail(function(){
      alert('error');
    })
 })
});