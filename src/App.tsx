import React, { useState, useEffect } from "react";
import { MapPin, ChevronDown, Heart } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";
import CalendarCard from "./components/CalendarCard";
import RSVPForm from "./components/RSVPForm";
import ScrollReveal from "./components/ScrollReveal";
import { playAmbientMusic } from "./audio";

export default function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Elegant automatic playback strategy
    const startMusic = () => {
      try {
        playAmbientMusic();
        setMusicPlaying(true);
        // Remove listeners once playback starts successfully
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
        window.removeEventListener("scroll", startMusic);
        window.removeEventListener("keydown", startMusic);
      } catch (e) {
        console.warn("Autoplay was prevented by browser, waiting for user interaction.", e);
      }
    };

    // Try immediate execution
    startMusic();

    // Fallback events: play automatically when user clicks, touches, scrolls, or presses any key
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
    window.addEventListener("scroll", startMusic, { passive: true });
    window.addEventListener("keydown", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] parchment-pattern relative overflow-x-hidden text-[#5C4D3C] flex flex-col">
      
      {/* MAIN INVITATION SITE CONTENT */}
      <div className="opacity-100 transition-opacity duration-1000">
        
        {/* Floating Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-amber-400 rounded-full opacity-20 petal-floating" style={{ animationDelay: "0s" }} />
          <div className="absolute top-[25%] right-[8%] w-4 h-4 bg-amber-500 rounded-full opacity-10 petal-floating" style={{ animationDelay: "3s" }} />
          <div className="absolute top-[45%] left-[12%] w-2.5 h-2.5 bg-amber-300 rounded-full opacity-35 petal-floating" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[65%] right-[15%] w-3 h-3 bg-amber-600 rounded-full opacity-25 petal-floating" style={{ animationDelay: "5s" }} />
          <div className="absolute top-[85%] left-[20%] w-4 h-4 bg-amber-400 rounded-full opacity-15 petal-floating" style={{ animationDelay: "2s" }} />
        </div>

        {/* Global floating Music Player */}
        <MusicPlayer isPlaying={musicPlaying} onPlayToggle={setMusicPlaying} />

        {/* Core Main Invitation Frame (Highly responsive layout) */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-16 md:py-24 relative z-10 flex flex-col gap-16 md:gap-24 leading-normal select-none">
          
          {/* Section 1: Top Hero Welcome Visual Card */}
          <ScrollReveal>
            <section className="min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-between text-center relative py-12 rounded-3xl bg-white border border-amber-900/10 shadow-lg px-6 max-w-2xl mx-auto w-full">
              
              <div className="w-16 h-1 bg-amber-600/30 rounded-full" />

              <div className="relative mt-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-500/40 flex items-center justify-center animate-[spin_40s_infinite_linear]">
                  <div className="w-16 h-16 rounded-full border border-amber-500/20" />
                </div>
                <span className="absolute inset-0 flex items-center justify-center font-cursive text-amber-800 text-4xl mt-1">
                  K
                </span>
              </div>

              <div className="my-auto flex flex-col items-center">
                <span className="font-sans font-semibold tracking-[0.25em] text-amber-900/60 uppercase text-xs sm:text-sm">
                  Мерейтойға Шақыру
                </span>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-950 mt-4 tracking-wide font-serif">
                  Кенжегүл
                </h1>

                <div className="inline-flex items-center gap-1 mt-3">
                  <span className="font-display text-5xl sm:text-6xl font-black text-gold-gradient tracking-tight filter drop-shadow-sm">
                    55
                  </span>
                  <span className="font-serif italic text-amber-800 font-bold text-lg sm:text-xl relative top-2">
                    жас
                  </span>
                </div>

                <p className="font-serif italic text-amber-800/80 text-sm sm:text-base mt-6 max-w-md px-4">
                  "Өмірдің көркем асуы мен мерейлі кезеңінің куәсі болуға асыл ағайынды шақырамыз"
                </p>
              </div>

              <div className="w-full flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold tracking-wider text-[#5C4D3C] bg-[#FAF6EE] px-5 py-2.5 rounded-full border border-amber-950/5">
                  <span>03.06.2026</span>
                  <span className="opacity-30">|</span>
                  <span>17:00</span>
                  <span className="opacity-30">|</span>
                  <span>Шымкент</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-[9px] font-semibold text-amber-900/40 uppercase tracking-widest mt-4">
                  <span>Төмен қарай сырғытыңыз</span>
                  <ChevronDown className="w-4 h-4 animate-bounce text-amber-600" />
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Section 2: Core Text Invitation Message with traditional styling */}
          <ScrollReveal>
            <section className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-amber-900/10 shadow-lg p-6 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-tl-full" />

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-[1px] w-8 bg-amber-500/30" />
                <Heart className="w-4 h-4 text-amber-600 fill-amber-500/15" />
                <div className="h-[1px] w-8 bg-amber-500/30" />
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-amber-950 font-bold mb-6 tracking-wide">
                Құрметті қауым!
              </h2>

              <div className="flex flex-col gap-6 text-sm sm:text-base text-[#5C4D3C] font-serif leading-relaxed italic max-w-lg mx-auto">
                <p>
                  "Тіршілік тал бесіктен басталған соң,<br />
                  Уақыт тоқтамайды жастар аққан."
                </p>
                
                <p className="not-italic font-sans text-xs sm:text-sm text-amber-950 font-medium tracking-wide uppercase px-4 py-2 bg-[#FAF6EE] rounded-xl border border-amber-950/5 my-2">
                  Аяулы анамыз, ардақты жар және асыл әпкеміз КЕНЖЕГҮЛДІҢ өмірінің мерейлі белесі – 55 жас мерейтойына арналған салтанатты кешімізге шақырамыз!
                </p>

                <p className="text-[#6B5A47]">
                  Ақ тілегі мен игі лебізін білдіретін, өміріміздің жақсы күндеріне ортақтасатын қымбатты, жанымызға жақын сыйлы қонағымыз болуға шақырамыз. Сәтті күнді бірге өткізіп, берекелі ақ дастарханымыздың куәсі болыңыздар!
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="w-12 h-[1px] bg-amber-500/20 mb-3" />
                <p className="font-cursive text-amber-800 text-3xl">Әулетімізден құрметпен!</p>
              </div>
            </section>
          </ScrollReveal>

          {/* Section 3: Classy Calendar (NO COUNTDOWN TIMER) */}
          <ScrollReveal>
            <section className="max-w-2xl mx-auto w-full">
              <CalendarCard />
            </section>
          </ScrollReveal>

          {/* Section 4: Venue and Interactive Mapping Navigation Links */}
          <ScrollReveal>
            <section className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-amber-900/10 shadow-lg p-6 sm:p-12 relative overflow-hidden">
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-900/5 rounded-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center">
                <MapPin className="w-8 h-8 text-amber-600 mb-4 animate-bounce" />

                <span className="font-sans font-semibold tracking-widest text-[#5C4D3C] text-xs uppercase mb-1">
                  Той Мекеніміз
                </span>

                <h3 className="font-display text-2xl sm:text-3xl text-amber-950 font-bold mb-2 animate-pulse">
                  "Grand Bagym"
                </h3>
                
                <p className="text-xs sm:text-sm font-semibold text-amber-800/80 mb-6 uppercase tracking-wider">
                  Мейрамханасы / Салтанат Сарайы
                </p>

                <div className="bg-[#FAF6EE] border border-amber-950/5 p-4 rounded-2xl w-full max-w-sm mb-8 text-center">
                  <span className="block text-[10px] font-bold text-amber-900/40 uppercase tracking-widest mb-1.5 font-sans">
                    Мекенжайы:
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-[#4A3B2C] leading-normal font-sans">
                    Шымкент қаласы
                  </p>
                </div>

                {/* Direct location route anchor */}
                <a
                  href="https://2gis.kz/shymkent/geo/70000001100131268/69.700545,42.373866"
                  target="_blank"
                  rel="noopener noreferrer referrerPolicy=no-referrer"
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-sans font-semibold text-xs tracking-[0.2em] rounded-xl hover:brightness-105 transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>2GIS КАРТАНЫ АШУ</span>
                </a>
              </div>
            </section>
          </ScrollReveal>

          {/* Section 5: Beautiful RSVP Form without AI Wizard */}
          <ScrollReveal>
            <section id="rsvp-section" className="scroll-mt-12 max-w-2xl mx-auto w-full">
              <RSVPForm />
            </section>
          </ScrollReveal>

          {/* Section 6: Monogram Elegant Stationery Footer (No secret triggers) */}
          <ScrollReveal>
            <footer className="max-w-2xl mx-auto w-full text-center flex flex-col items-center py-6 gap-6 relative">
              <div className="w-16 h-[1px] bg-amber-500/20" />
              
              <div>
                <h5 className="font-cursive text-amber-800 text-3xl font-medium tracking-wide">
                  Кенжегүлдің
                </h5>
                <p className="text-[10px] font-sans font-bold text-amber-900/50 uppercase tracking-widest mt-1">
                  55 жас мерейтойлық салтанаты
                </p>
              </div>

              <p className="text-[10px] text-amber-800/40 font-mono tracking-wider max-w-xs mt-4">
                Өмірініз бақытпен, ақ тілектермен және амандық өрлеуімен аялансын!
              </p>
            </footer>
          </ScrollReveal>

        </main>
      </div>

    </div>
  );
}
