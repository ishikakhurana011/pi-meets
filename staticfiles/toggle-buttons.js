const videoGrid = document.getElementById('video-grid');
const sendButton = document.getElementById('send-Button');
const chatWindow = document.getElementById('chat-window');
const messageList = document.getElementById('messages');
const inputBox = document.getElementById('take-input');
const copyButton = document.getElementById('copy-button');
const copy_message = document.getElementById('copy-message')

function whiteBoard(){
  window.open(`/whiteboard/${ROOM_ID.trim()}`, '_blank');
}


function endCall(){
    window.location.assign("/callend");
}


function openMeet(){
    window.location.assign(`/${ROOM_ID.trim()}`);
}


function goToChatRoom(){
  window.location.assign(`/chatroom/${ROOM_ID.trim()}`);
}


function setClipboard(){
    navigator.clipboard.writeText("Hi there! I am using Pi meets, a free web app to organize online video conferences and chat from your computer using any modern web browser on the link http://pi-meets.herokuapp.com. Join me for video conference with room id:"+ROOM_ID);
    copyButton.classList.add("active");

    setTimeout(function(){
        copyButton.classList.remove("active");
    }, 2000);
}


function setClipboard_chatroom(){
  navigator.clipboard.writeText("Hi there! I am using Pi meets, a free web app to organize online video conferences and chat from your computer using any modern web browser on the link http://pi-meets.herokuapp.com. Join my chat room with room id:"+ROOM_ID);
  copy_message.classList.add("active");

  setTimeout(function(){
      copy_message.classList.remove("active");
  }, 2000);
}


function muteUnmute () {
    const enabled = window.myVideoStream.getAudioTracks()[0].enabled;
    console.log(window.myVideoStream);
    if (enabled) {
      window.myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      window.myVideoStream.getAudioTracks()[0].enabled = true;
    }
  };


  function setUnmuteButton (){
    const html = `<i class="unmute fa fa-microphone-slash"></i>`;
    document.getElementById("muteButton").innerHTML = html;
  };
  function setMuteButton () {
    const html = `<i class="fa fa-microphone"></i>`;
    document.getElementById("muteButton").innerHTML = html;
  };


  function playStop () {
    let enabled = window.myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      window.myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo();
    } else {
      setStopVideo();
      window.myVideoStream.getVideoTracks()[0].enabled = true;
    }
  };
  


  function setPlayVideo () {
    const html = `<i class="iconify" data-icon="fa-solid:video-slash" data-inline="false"></i>`;
    document.getElementById("vid-icon").innerHTML = html;
  };
  
  function setStopVideo (){
    const html = `<i class=" fa fa-video"></i>`;
    document.getElementById("vid-icon").innerHTML = html;
  };