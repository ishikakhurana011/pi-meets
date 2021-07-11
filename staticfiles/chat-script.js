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

const user_name = prompt('Enter your name: ');

const inputBox = document.getElementById('take-input');
const messageList = document.getElementById('messages');
const chatWindow = document.getElementById('chat-window');



const db = firebase.firestore();


window.sendButtonHandler = function(){
    if (inputBox.value != "") {
        if (db) {
            db.collection('meetings').doc(ROOM_ID).collection('messages').add({
                sender: user_name,
                time: new Date(),
                message: inputBox.value,
            });
        }

        socket.emit("Message", inputBox.value, user_name);
        inputBox.value = "";
    }    
}


document.addEventListener('keydown', function (key) {
    if (((key.which === 13) || (key.keyCode === 13)) && inputBox.value != "") {
        if (db) {
            db.collection('meetings').doc(ROOM_ID).collection('messages').add({
                sender: user_name,
                time: new Date(),
                message: inputBox.value,
            });
        }
        socket.emit("Message", inputBox.value, user_name);
        inputBox.value = "";
    }
});


function loadMessages(){
    if(db){
        db.collection('meetings').doc(ROOM_ID).collection('messages').orderBy('time', 'desc').limit(100).get().then(querySnapShot => {
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

//load messages once in the beginning
loadMessages();


socket.emit('join-room', ROOM_ID, socket.id);

socket.on('user-connected', function (userId) {
    console.log('User Connected with id: ', userId);
});


socket.on('newMessage', function(msg, senderName, senderUserId){
    const currentTime = getCurrentTime();

    console.log(msg);
    let li = document.createElement("li");

    li.innerHTML = ` <b> ${senderName}: &nbsp; </b> ` + `<span style=" color:#807c7c; font: 1px !important;"> ${currentTime} </span>` + `<br>` + msg + `<br> <br>`;
    messageList.append(li);
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }
});



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


