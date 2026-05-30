import React, { useEffect } from "react";
import { playAmbientMusic, stopAmbientMusic } from "../audio";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onPlayToggle: (playing: boolean) => void;
}

export default function MusicPlayer({ isPlaying, onPlayToggle }: MusicPlayerProps) {
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopAmbientMusic();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopAmbientMusic();
      onPlayToggle(false);
    } else {
      playAmbientMusic();
      onPlayToggle(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        id="bg-music-toggle-btn"
        className="relative w-16 h-16 sm:w-20 sm:h-20 focus:outline-none group flex items-center justify-center cursor-pointer"
        aria-label="Toggle Background Music"
      >
        {/* Subtle gold outer glow pulsing ring */}
        <span className={`absolute inset-0 rounded-full bg-amber-100 transition-all duration-700 ${
          isPlaying ? "animate-ping opacity-15" : "opacity-0 group-hover:opacity-10 scale-105"
        }`} />

        {/* Outer Spinning text SVG */}
        <div className={`absolute inset-0 transition-transform duration-[12000ms] ease-linear repeat-infinite ${
          isPlaying ? "animate-spin" : "scale-95 opacity-80"
        }`}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="textPath"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
            </defs>
            <text className="font-sans font-semibold tracking-[0.22em] uppercase text-[7px] fill-amber-800/80">
              <textPath href="#textPath" startOffset="0%">
                • Әуенді қосу • Әуенді қосу • Әуенді қосу •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Inner controls disc */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-[1.5px] shadow-md border border-amber-300 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <div className="w-full h-full rounded-full bg-[#FAF6EE] flex items-center justify-center group-hover:bg-[#FFF] transition-colors duration-300">
            {isPlaying ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900/60" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
