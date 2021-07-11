const intro = introJs();

intro.setOptions({
    steps: [
        {
             intro: 'Hey there! Welcome to Pi Chats. Let\'s take a tour! '
        },     
        {
            element: '#end-call',
            intro: 'Leave the chat room using this button'
        },
        {
            element: '#open-meet',
            intro: 'Start a video conference with people in this room using this button'
        },
        {
            element: '#copy-message',
            intro: 'Use this button to share the room id with your friends'
        },
        {
            intro: 'Happy chatting!'
        }
    ] 

});

intro.start();