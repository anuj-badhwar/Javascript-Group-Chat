var socket = io();

$(function(){

    username = prompt("ENTER USERNAME");

    $.get('/showChat',function(data,status){
        $('#chatbox').html('<br><br>');

        console.log(data);

        for(x of data){

            $('#chatbox').append(x.name + ' : ' + x.msg + '<br>');
          console.log(x);
        }

    });

   $('#submitchat').click(function(){
        socket.emit('chat',
            {
                user : username,
                msg : $('#chatmessage').val()}
            )
   })

    socket.on('chat',function(data){
       $('#chatbox').append(data.user + ': ' + data.msg + '<br>');
    });
});