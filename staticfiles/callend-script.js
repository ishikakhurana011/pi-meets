function init(){
    you = document.getElementById("you");
    left = document.getElementById("left");
    the = document.getElementById("the");
    meet = document.getElementById("meet");
    
    you_pen = you.getContext('2d');
    left_pen = left.getContext('2d');
    the_pen = the.getContext('2d');
    meet_pen = meet.getContext('2d');

    you_pen.fillStyle="red";

    you_img = new Image();
    left_img = new Image();
    the_img = new Image();
    meet_img = new Image();

    you_img.src = "you1.png";
    left_img.src = "left1.png";
    the_img.src = "the1.png";
    meet_img.src = "meet1.png";

    you_img2 = new Image();
    left_img2 = new Image();
    the_img2 = new Image();
    meet_img2 = new Image();

    you_img2.src = "you2.png";
    left_img2.src = "left2.png";
    the_img2.src = "the2.png";
    meet_img2.src = "meet2.png";

    num = 1;
}

function draw(){
    you_pen.clearRect(0,0,150,100);
    left_pen.clearRect(0,0,140,100);
    the_pen.clearRect(0,0,120,100);
    meet_pen.clearRect(0,0,150,100);

    if(num==1){
        you_pen.drawImage(you_img, 0, 0, 150, 100);
        left_pen.drawImage(left_img, 0, 0, 140, 100);
        the_pen.drawImage(the_img, 0, 0, 120, 100);
        meet_pen.drawImage(meet_img, 0, 0, 150, 100);
    }
    else{
        you_pen.drawImage(you_img2, 0, 0, 150, 100);
        left_pen.drawImage(left_img2, 0, 0, 140, 100);
        the_pen.drawImage(the_img2, 0, 0, 120, 100);
        meet_pen.drawImage(meet_img2, 0, 0, 150, 100);
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
  
