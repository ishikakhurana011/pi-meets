function openNewRoom(){
    window.location.assign("newRoom");
}

function openNewChatRoom(){
    window.location.assign("/chatroom/new");
}



document.addEventListener('keydown', function(key){
    if(((key.which===13) || (key.keyCode===13) )){
        var dist = document.getElementById('input-room-video').value;
        var dist2 = document.getElementById('input-room-chat').value;
            if (dist!=""){
                window.location.href=dist;
            }
            else if(dist2!=""){
                window.location.href='/chatroom/'+dist2;
            }
            else
               alert('Oops! This roomId is invalid.');
    }
});


function init(){
    logo = document.getElementById("logo");
    meets = document.getElementById("meets");

    logo_pen = logo.getContext('2d');
    meets_pen = meets.getContext('2d');
   
    logo_img = new Image();
    logo_img.src = "logo1.png";

    logo_img2 = new Image();
    logo_img2.src = "logo2.png";

    
    meets_img = new Image();
    meets_img.src = "meets1.png";

    meets_img2 = new Image();
    meets_img2.src = "meets2.png";

    num = 1;
}

function draw(){
    logo_pen.clearRect(0,0,75,90);
    meets_pen.clearRect(0,0,190,85);

    if(num==1){
        logo_pen.drawImage(logo_img, 0, 0, 75, 90);
        meets_pen.drawImage(meets_img, 0, 0, 190, 85);
    }
    else{
        logo_pen.drawImage(logo_img2, 0, 0, 75, 90);
        meets_pen.drawImage(meets_img2, 0, 0, 190, 85);
    }
    
}


function update(){
    if(num==1){
        num=2;
    }

    else{
        num=1;
    }
  }

  function animation_loop(){
      draw();
      update();
  }

  init();
  
  var f = setInterval(animation_loop,500);
  
