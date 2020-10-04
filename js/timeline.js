var canvas = document.getElementById("myCanvas");
var timeline = canvas.getContext("2d");

// Event handler to resize the canvas when the document view is changed
(function() {
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw everything after resizing the window
    draw(); 
  }
  resizeCanvas();
})();

function draw() {
  requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  timeline.fillRect(0, 0, canvas.width, canvas.height);
  timeline.lineWidth = 5;
  
  timeline.beginPath();
  
  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;
  
  for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height/2;

        if(i === 0) {
          timeline.moveTo(x, y);
        } else {
          timeline.lineTo(x, y);
        }

        x += sliceWidth;
      };
  
  timeline.lineTo(canvas.width, canvas.height/2);
  timeline.stroke();
};