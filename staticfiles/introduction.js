const intro = introJs();

intro.setOptions({
    steps: [
        {
             intro: 'Hey there! Welcome to Pi meets, a free web app to organise free video conferences using your laptop. Let\'s take a tour of the website! '
        },
        {
            intro: 'Use the shortcuts ctrl+arrowup to toggle your video and ctrl+arrowdown for audio'
        },
        {
            element : '#chatbox',
            intro: 'Start a conversation! Send messages to everyone in the meet using this chatbox'
        },
        
        {
            element: '#vid-icon',
            intro: 'Toggle your video using this button!'
        },
        {
            element: '#end-call-button',
            intro: 'Leave the meeting using this button'
        },
        {
            element: '#muteButton',
            intro: 'Toggle your audio using this button'
        },
        {
            element: '#board-button',
            intro: 'Use this button to open a collaborative whiteboard'
        },
        {
            element: '#chat-button',
            intro: 'Use this button to go back to the chat room'
        },
        {
            element: '#copy-button',
            intro: 'Use this button to share the meeting id with your teammates'
        },
        {
            intro: 'In case the website is not working properly, please grant access to the website from the browser and refresh the page.'
        }


    ] 

});

intro.start();