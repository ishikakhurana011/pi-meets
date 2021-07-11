const socket = io();

socket.emit('join-room', ROOM_ID, socket.id);

socket.on('user-connected', function (userId) {
    console.log('User Connected with id: ', userId);
});

// var pickColor = document.getElementById('colorpick').value;
var canvas = document.getElementById('myCanvas');
var pen = canvas.getContext("2d");


var drawing = false;
var current = {
  color: "red",
};


function applyChange(){
    var pickColor = document.getElementById('colorpick').value;
    current.color = pickColor;
}


function erasePixel(){
    current.color = "white";
}



function clearCanvas(){
    pen.clearRect(0,0,canvas.width,canvas.height);
    socket.emit('clear', ROOM_ID);
}


socket.on('clear-canvas', function(){
    pen.clearRect(0,0,canvas.width,canvas.height);
});


function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();
  
      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  
  
function drawLine(x0, y0, x1, y1, color, emit) {
    pen.beginPath();
    pen.moveTo(x0, y0);
    pen.lineTo(x1, y1);
    pen.strokeStyle = color;
    pen.lineWidth = 2;
    pen.stroke();
    pen.closePath();
  
    if (!emit) {
      return;
    }
  
    var w = canvas.width;
    var h = canvas.height;
  
    socket.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color
    }, ROOM_ID);
  }
  
  function onMouseDown(e) {
    drawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  }
  
  function onMouseUp(e) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
  }
  
  function onMouseMove(e) {
    if (!drawing) {
      return;
    }
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
  }
  
  // Desktop Events
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);
  
  // Mobile Events
  canvas.addEventListener("touchstart", onMouseDown, false);
  canvas.addEventListener("touchend", onMouseUp, false);
  canvas.addEventListener("touchcancel", onMouseUp, false);
  canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);
  
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", onResize, false);
  onResize();
  
  function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }
  
  socket.on("draw-this", onDrawingEvent);