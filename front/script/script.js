$('#send_button').click(function() {
    const userInput = $('#input_field').val().trim();
    if (userInput !== "") {
        $('#chat_log').append(`<div class="user-message">${userInput}</div>`);
        $('#input_field').val('');

        $.ajax({
            url: 'http://127.0.0.1:5000/chat', // Replace with your server URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput }),
            success: function(response) {
                $('#chat_log').append(`<div class="bot-message">${response.reply}</div>`);
                $('#chat_log').scrollTop($('#chat_log')[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

$('#input_field').keypress(function(e) {
    if (e.which === 13) {
        $('#send_button').click();
    }
});