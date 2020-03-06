$(function(){ 
  var buildHTML = function(message) {
    console.log(message)
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html =  `<div class="chat-main__messages__message" data-message-id=` + message.id + `>` +
      `<div class="chat-main__messages__message__info">` +
        `<div class="chat-main__messages__message__info__name">` +
          message.user_name +
        `</div>` +
        `<div class="chat-main__messages__message__info__date">` +
          message.time +
        `</div>` +
      `</div>` +
        `<div class="chat-main__messages__tex">` +
          `<p class="chat-main__messages__text__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="chat-main__messages__message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html =  `<div class="chat-main__messages__message" data-message-id=` + message.id + `>` +
      `<div class="chat-main__messages__message__info">` +
        `<div class="chat-main__messages__message__info__name">` +
          message.user_name +
        `</div>` +
        `<div class="chat-main__messages__message__info__date">` +
          message.time +
        `</div>` +
      `</div>` +
        `<div class="chat-main__messages__message__text">` +
          `<p class="chat-main__messages__message__text__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html =  `<div class="chat-main__messages__message" data-message-id=` + message.id + `>` +
      `<div class="chat-main__messages__message__info">` +
        `<div class="chat-main__messages__message__info__name">` +
          message.user_name +
        `</div>` +
        `<div class="chat-main__messages__message__info__date">` +
          message.time +
        `</div>` +
      `</div>` +
        `<div class="chat-main__messages__message">` +
          `<img src="` + message.image + `" class="chat-main__messages__message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
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
      // $('.form__submit').prop('disabled', false);は、 htmlの仕様でsubmitボタンを一度押したらdisabled属性というボタンが押せなく属性が追加されます。 そのため、disabled属性をfalseにする記述を追加しています
    })  
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $('.chat-main__form__new__submit-btn').prop('disabled', false);
    });
  });
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.chat-main__messages__message:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
              //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__messages').append(insertHTML);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight}); 
     }
    })
      .fail(function() {
        alert('error');
      });
      
    };
 
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
 })
