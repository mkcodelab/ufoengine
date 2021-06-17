let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let frequency = 0;

let reverb = audioCtx.createConvolver();
reverb.normalize = false;
// reverbBuffer = audioCtx.createBuffer(1, 2, audioCtx.sampleRate);
// console.log(reverb)
// reverb.buffer = reverbBuffer;

let masterGain = audioCtx.createGain();
masterGain.gain.value = 0.5;
masterGain.connect(audioCtx.destination);

let gainNode = audioCtx.createGain();
gainNode.gain.value = 0.02;
gainNode.connect(masterGain);

let gainNode2 = audioCtx.createGain();
gainNode2.gain.value = 0.05;
gainNode2.connect(masterGain);

let gainNode3 = audioCtx.createGain();
gainNode3.gain.value = 0.05;
gainNode3.connect(masterGain);

const mainVolumeInput = document.querySelector('#mainVolume');
mainVolumeInput.addEventListener('change', ()=>{
    masterGain.gain.value = mainVolumeInput.value;
})

let mouse = {
    x: null,
    y: null,
};

let oscillator1 = null;
let oscillator2 = null;
let oscillator3 = null;

const lowshelf = audioCtx.createBiquadFilter();
lowshelf.type = 'lowshelf';
lowshelf.frequency.value = 5000;

const lowpass = audioCtx.createBiquadFilter();
lowpass.type = 'lowpass';
lowpass.frequency.value = 2000;

// mousemove event
window.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    frequency = mouse.x * 2;
    lowpass.frequency.value = mouse.y * 2;
    lowshelf.frequency.value = mouse.y * 2;
   
    oscillator1.frequency.value = frequency;
    oscillator2.frequency.value = frequency / 8 + Math.random() + 100;
    oscillator3.frequency.value = frequency / 2 + Math.random() * 200;
});

// touchmove event
window.addEventListener('touchmove', function(e){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    frequency = mouse.x * 2;
    lowpass.frequency.value = mouse.y * 2;
    lowshelf.frequency.value = mouse.y * 2;
   
    oscillator1.frequency.value = frequency;
    oscillator2.frequency.value = frequency / 8 + Math.random() + 100;
    oscillator3.frequency.value = frequency / 2 + Math.random() * 200;
});

// mousedown
window.addEventListener('mousedown', function(){
    
    let osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.connect(lowshelf).connect(gainNode);

    let osc2 = audioCtx.createOscillator();
    osc2.connect(lowpass).connect(gainNode2);
    osc2.type = 'sawtooth';
   
    let osc3 = audioCtx.createOscillator();
    osc3.connect(gainNode3);
    osc3.type = 'sine';

    oscillator1 = osc;
    oscillator2 = osc2;
    oscillator3 = osc3;

    osc.start(0);
    osc2.start(0);
    osc3.start(0)
    
});
// touchstart
window.addEventListener('touchstart', function(){
    
    let osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.connect(lowshelf).connect(gainNode);

    let osc2 = audioCtx.createOscillator();
    osc2.connect(lowpass).connect(gainNode2);
    osc2.type = 'sawtooth';
   
    let osc3 = audioCtx.createOscillator();
    osc3.connect(gainNode3);
    osc3.type = 'sine';

    oscillator1 = osc;
    oscillator2 = osc2;
    oscillator3 = osc3;

    osc.start(0);
    osc2.start(0);
    osc3.start(0)
    
});

window.addEventListener('mouseup', function(){
 
   oscillator1.stop();
   oscillator1.disconnect();
   oscillator2.stop();
   oscillator2.disconnect();
   oscillator3.stop();
   oscillator3.disconnect();
   
});

window.addEventListener('touchend', function(){
 
    oscillator1.stop();
    oscillator1.disconnect();
    oscillator2.stop();
    oscillator2.disconnect();
    oscillator3.stop();
    oscillator3.disconnect();
    
 })
