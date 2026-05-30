/**
 * Beautiful, pure Web Audio API synthesis for a peaceful, luxury ambient backdrop.
 * Play soundscapes resembling a premium crystal music box.
 */

let audioCtx: AudioContext | null = null;
let musicInterval: any = null;
let padOsc: OscillatorNode | null = null;
let padGain: GainNode | null = null;

export function playAmbientMusic() {
  try {
    if (audioCtx) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    audioCtx = new AudioContextClass();
    
    // Create soft synthesizer drone pad for a beautiful warm base
    padOsc = audioCtx.createOscillator();
    padGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    padOsc.type = "sine";
    padOsc.frequency.setValueAtTime(130.81, audioCtx.currentTime); // Warm C3
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(250, audioCtx.currentTime);
    
    padGain.gain.setValueAtTime(0, audioCtx.currentTime);
    
    padOsc.connect(filter);
    filter.connect(padGain);
    padGain.connect(audioCtx.destination);
    
    padOsc.start();
    padGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2.0); // Smooth fade-in
    
    // Beautiful pentatonic bell scale
    const scale = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
    ];
    
    // Traditional-inspired peaceful melody pattern
    const pattern = [4, 6, 5, 3, 7, 5, 6, 2, 5, 4, 3, 1, 4, 3, 2, 0];
    let stepIndex = 0;
    
    const playStep = () => {
      if (!audioCtx || audioCtx.state === "closed") return;
      
      const time = audioCtx.currentTime;
      const noteFreq = scale[pattern[stepIndex % pattern.length]];
      
      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();
      const bellFilter = audioCtx.createBiquadFilter();
      
      bellOsc.type = "triangle";
      bellOsc.frequency.setValueAtTime(noteFreq, time);
      
      bellFilter.type = "lowpass";
      bellFilter.frequency.setValueAtTime(1500, time);
      
      bellGain.gain.setValueAtTime(0, time);
      bellGain.gain.linearRampToValueAtTime(0.06, time + 0.04); // Attack
      bellGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4); // Long crystal decay
      
      bellOsc.connect(bellFilter);
      bellFilter.connect(bellGain);
      bellGain.connect(audioCtx.destination);
      
      bellOsc.start(time);
      bellOsc.stop(time + 2.5);
      
      // Every 4 steps, generate a soft harmonic bass/accompaniment note to add deep fullness
      if (stepIndex % 4 === 0) {
        const chordFreqs = [130.81, 164.81, 196.00]; // C3, E3, G3
        const bassOsc = audioCtx.createOscillator();
        const bassGain = audioCtx.createGain();
        
        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(chordFreqs[(stepIndex / 4) % chordFreqs.length] / 2, time);
        
        bassGain.gain.setValueAtTime(0, time);
        bassGain.gain.linearRampToValueAtTime(0.08, time + 0.1);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, time + 3.5);
        
        bassOsc.connect(bassGain);
        bassGain.connect(audioCtx.destination);
        
        bassOsc.start(time);
        bassOsc.stop(time + 4.0);
        
        // Gently modulate pad chord root for musical evolution
        if (padOsc) {
          const newPadRoot = [130.81, 146.83, 164.81][(stepIndex / 4) % 3];
          padOsc.frequency.exponentialRampToValueAtTime(newPadRoot, time + 2.0);
        }
      }
      
      stepIndex++;
    };
    
    // Play a crystal note every 800ms
    musicInterval = setInterval(playStep, 800);
    
  } catch (err) {
    console.warn("Audio synthesis initialization failed:", err);
  }
}

export function stopAmbientMusic() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  
  if (padOsc) {
    try {
      padOsc.stop();
    } catch (_) {}
    padOsc = null;
  }
  
  if (audioCtx) {
    try {
      if (audioCtx.state !== "closed") {
        audioCtx.close();
      }
    } catch (_) {}
    audioCtx = null;
  }
}
