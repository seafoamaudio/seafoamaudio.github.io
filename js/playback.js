var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

if (AudioContext) {
    // Do whatever you want using the Web Audio API
    var context = new AudioContext;
    // ...
} else {
    // Web Audio API is not supported
    // Alert the user
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
}

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

	timeline.strokeStyle = pulseDict[type]

	// Start Oscillator
	o.start(0)
	draw();
}
