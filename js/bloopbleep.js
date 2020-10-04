var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

if (AudioContext) {
    // Do whatever you want using the Web Audio API
    var ctx = new AudioContext;
    // ...
} else {
    // Web Audio API is not supported
    // Alert the user
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
}

var context = new AudioContext()
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var o=null
var g=null

// Make the Pulse waveform have a different color
var pulseDict = {};
pulseDict['sine'] = 'rgb(113, 238, 184)'
pulseDict['square'] = 'rgb(247, 239, 153)'
pulseDict['sawtooth'] = 'rgb(241, 187, 135)'
pulseDict['triangle'] = 'rgb(247, 142, 105)'

// Web Audio Analyser
var analyser = context.createAnalyser();
analyser.fftSize = 512;

/*an unsigned long value half that of the FFT size. This generally equates to 
the number of data values you will have to play with for the visualization*/
var bufferLength = analyser.frequencyBinCount; 
var dataArray = new Uint8Array(bufferLength);

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

function playPulse(frequency,type, duration=0.25)
{
	o=context.createOscillator()
	g=context.createGain()
	o.type=type
	o.connect(g)
	o.frequency.value=frequency

	g.connect(analyser);
	g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+duration)

	analyser.connect(context.destination);

	ctx.strokeStyle = pulseDict[type]

	// Start Oscillator
	o.start(0)
	draw();
}


function draw() {
  requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5;
  
  ctx.beginPath();
  
  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;
  
  for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height/2;

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      };
  
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();
};
