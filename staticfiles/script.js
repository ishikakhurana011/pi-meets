var firebase = window.firebase;
const socket = io();

const app = firebase.initializeApp({
    apiKey: "AIzaSyCJ9L-6fW0Yg2DKz1a_yvtae5UdX5_gZhk",
    authDomain: "teams-clone-dc6b8.firebaseapp.com",
    projectId: "teams-clone-dc6b8",
    storageBucket: "teams-clone-dc6b8.appspot.com",
    messagingSenderId: "766530244770",
    appId: "1:766530244770:web:1c17533222fedff18e87fb",
    measurementId: "G-8JC1GCKZV5"
});

const db = firebase.firestore();


const videoGrid = document.getElementById('video-grid');
const sendButton = document.getElementById('send-Button');
const chatWindow = document.getElementById('chat-window');
const messageList = document.getElementById('messages');
const inputBox = document.getElementById('take-input');
const copyButton = document.getElementById('copy-button');

var getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

name = prompt("Enter Your Name: ");
var ping_sound = new Audio('ping.mp3');


window.buttonHandler = function () {
    if (inputBox.value != "") {
        // write on firestore database
        if (db) {
            db.collection('meetings').doc(ROOM_ID).collection('messages').add({
                sender: name,
                time: new Date(),
                message: inputBox.value
            });
        }

        socket.emit("Message", inputBox.value, name);
        inputBox.value = "";
    }

}


document.addEventListener('keydown', function (key) {
    if (((key.which === 13) || (key.keyCode === 13)) && inputBox.value != "") {
        // write on firestore database
        if (db) {
            db.collection('meetings').doc(ROOM_ID).collection('messages').add({
                sender: name,
                time: new Date(),
                message: inputBox.value
            });
        }

        socket.emit("Message", inputBox.value, name);
        inputBox.value = "";
    }
    
});


socket.on("newMessage", function (msg, senderName) {
    const currentTime = getCurrentTime();

    console.log(msg);
    let li = document.createElement("li");

    ping_sound.play();
    li.innerHTML = ` <b> ${senderName}: &nbsp; </b> ` + `<span style=" color:#807c7c; font: 1px !important;"> ${currentTime} </span>` + `<br>` + msg + `<br> <br>`;
    messageList.append(li);
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }

});


function loadMessages(){  
    if(db){
        db.collection('meetings').doc(ROOM_ID).collection('messages').orderBy('time', 'desc').limit(100).get().then((querySnapShot) => {
            const documents = querySnapShot.docs.reverse();
            documents.forEach((doc) => {
              let li = document.createElement("li");
              let obj = doc.data();
              let correct_time = getTime(obj.time);
              li.innerHTML = ` <b> ${obj.sender}: &nbsp; </b> ` + `<span style=" color:#807c7c; font: 1px !important;"> ${correct_time} </span>` + `<br>` + `${obj.message}` + `<br> <br>`;

              messageList.append(li);
            })
          })
    }
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }

}

function getTime(today) {
    let hours = today.getHours();
    let mins = today.getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (mins < 10) {
        mins = '0' + mins;
    }

    var correct_time = `${hours}:${mins}`;
    return correct_time;
}

loadMessages();



function getCurrentTime() {
    let today = new Date();
    let hours = today.getHours();
    let mins = today.getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (mins < 10) {
        mins = '0' + mins;
    }

    var currentTime = `${hours}:${mins}`;
    return currentTime;
}

const myPeer = new Peer(undefined);


const myVideo = document.createElement('video');
myVideo.muted = true;


const peers = {};


navigator.mediaDevices.getUserMedia({
    'video': true,
    'audio': true
}).then(function (stream) {
    addVideoStream(myVideo, stream);
    window.myVideoStream = stream;
    myPeer.on('call', function (call) {
        call.answer(stream);
        const newVideo = document.createElement('video');

        call.on('stream', function (userVideo) {
            addVideoStream(newVideo, userVideo);
        });
    });

    socket.on('user-connected', function (userId) {
        connectToNewUser(userId, stream);
    });

}).catch(function (err) {
    console.log(err);
});


socket.on('user-disconnected', function (userId) {
    if (peers[userId]) peers[userId].close();
});



myPeer.on('open', function (id) {
    socket.emit('join-room', ROOM_ID, id);
})


function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const new_video = document.createElement('video');

    call.on('stream', function (userstream) {
        addVideoStream(new_video, userstream);
    });

    call.on('close', function () {
        new_video.remove();
    });


    peers[userId] = call;
}


function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });

    videoGrid.append(video);
}


socket.on('user-connected', function (userId) {
    console.log('User Connected with id: ', userId);
});



// define a handler
function doc_keyUp_audio(key) {
    if (key.ctrlKey && key.key === 'ArrowDown') {
        muteUnmute();
    }
}
// register the handler 
document.addEventListener('keyup', doc_keyUp_audio, false);


// define a handler
function doc_keyUp_video(key) {
    if (key.ctrlKey && key.key === 'ArrowUp') {
        playStop();
    }
}
// register the handler 
document.addEventListener('keyup', doc_keyUp_video, false);