// TODO: refactor more and make it configurable and
//       remove the hard codes.
(function(){
  function canvasMouseDown(event) {
    this.style.zIndex += 20;
  }

  function generateBlocks(cols, rows) {
    var blocks = new Array();

    for (var col = 0; col < cols; col++) {
      blocks[col] = new Array();
      
      for (var row = 0; row < rows; row++) {
        
        var canvas = document.createElement("canvas");
        canvas.addEventListener("mousedown", canvasMouseDown, false);
        canvas.width = width;
        canvas.height = height;

        blocks[col][row] = canvas;
      }
    }

    return blocks;
  }

  function drawBlockElements(container) {
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        var canvas = blocks[col][row];
        var randomLeft = Math.floor(Math.random() * (container.offsetWidth - width))
        var randomTop = Math.floor(Math.random() * (container.offsetHeight - height))

        canvas.style.left = randomLeft + "px";
        canvas.style.top  = randomTop + "px";
        container.appendChild(canvas);
      }
    }
  }


  function updateBlocks() {
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        var canvas = blocks[col][row];
        var context = canvas.getContext('2d');

        context.drawImage(video, col * width, row * height, width, height, 0, 0, width, height)
      }
    }
  }

  var video = document.querySelector('#video');


  var x = 0, y = 0, width =  160, height = 120, cols = 4, rows = 4;

  var container = document.querySelector("#container");
  var blocks = generateBlocks(cols, rows);
  drawBlockElements(container);


  function gameLoop() {
    window.setTimeout(gameLoop, 20);
    updateBlocks(); 
  }

  gameLoop();

  jQuery('canvas').drag(function( ev, dd ){
    jQuery( this ).css({
      top: Math.round( dd.offsetY / 20 ) * 20,
      left: Math.round( dd.offsetX / 20 ) * 20
    });
  });  

  navigator.webkitGetUserMedia({audio: false, video: true}, function(stream) {
    video.src = webkitURL.createObjectURL(stream);
  }, function(e) {
    console.error(e);
  });
})();
