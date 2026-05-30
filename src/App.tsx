import React, { useState } from "react";
import { MapPin, ChevronDown, Heart } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";
import CalendarCard from "./components/CalendarCard";
import RSVPForm from "./components/RSVPForm";
import ScrollReveal from "./components/ScrollReveal";
import { playAmbientMusic } from "./audio";

export default function App() {
  const [wishText, setWishText] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Handles clicking "Открыть приглашение"
  const handleOpenInvitation = () => {
    setIsFading(true);
    // Bypasses browser autoplay restrictions via explicit user click trigger
    try {
      playAmbientMusic();
      setMusicPlaying(true);
    } catch (e) {
      console.warn("Audio Context launch failed:", e);
    }

    // Delay setting isOpened so that fade-out animation plays cleanly
    setTimeout(() => {
      setIsOpened(true);
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] parchment-pattern relative overflow-x-hidden text-[#5C4D3C] flex flex-col">
      
      {/* 1. INITIAL COVER GREETING CARD (EPIC LUXURY ENVELOPE) */}
      {!isOpened && (
        <div
          className={`fixed inset-0 z-[999] flex flex-col items-center justify-between bg-[#4a1216] transition-all duration-700 ease-out py-12 md:py-16 ${
            isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Envelope geometric flaps (CSS polygons) mimicking actual visual depth of three-dimensional envelope folds */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Left flap */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[#3c0e11] origin-left" style={{ clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)", opacity: 0.95 }} />
            {/* Right flap */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#3c0e11] origin-right" style={{ clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)", opacity: 0.95 }} />
            {/* Bottom flap */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#2d090c]" style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)", opacity: 0.98 }} />
            {/* Top flap */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-[#52161b] shadow-xl" style={{ clipPath: "polygon(0% 0%, 50% 50%, 100% 0%)", opacity: 0.92 }} />
          </div>

          {/* Top text content - Elegant Cursive and spacing */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-6">
            <span className="font-cursive text-[#fcf9f2] text-4xl sm:text-5xl md:text-6xl tracking-wide filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              Сіз шақыру алдыңыз.
            </span>
            <span className="font-sans font-bold text-[#e1c58d]/90 text-[11px] sm:text-xs md:text-sm tracking-[0.3em] uppercase mt-4 block filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              МЕРЕЙТОЙҒА ШАҚЫРУ
            </span>
          </div>

          {/* Centered Golden Wax Seal stamp (Interactive button) */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <button
              onClick={handleOpenInvitation}
              type="button"
              className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl focus:outline-none select-none group"
              style={{
                background: "radial-gradient(circle, #f0dca2 0%, #cba760 50%, #9e7934 100%)",
                borderRadius: "53% 47% 49% 51% / 46% 52% 48% 54%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.4)"
              }}
              aria-label="Открыть приглашение"
            >
              {/* Outer double gold circular accent ring with rotating motion on hover */}
              <div className="absolute inset-2 rounded-full border border-[#71531a]/40 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" />
              <div className="absolute inset-[10px] rounded-full border border-[#8f6e2c]/35 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none" />

              {/* Textured wax center core stamp */}
              <div 
                className="absolute inset-4 rounded-full flex items-center justify-center pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #ebd296 0%, #bf9b54 100%)",
                  border: "2px double #866120",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.25)"
                }}
              >
                <span className="font-serif font-black text-amber-950 text-xs sm:text-sm tracking-[0.2em] uppercase select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]">
                  АШУ
                </span>
              </div>
            </button>
          </div>

          {/* Bottom text invitation call to action */}
          <div className="relative z-10 text-center max-w-sm px-6">
            <p className="font-sans text-[#dfd4bd]/80 text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed max-w-xs mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Шақыруды ашу үшін «АШУ»<br />батырмасын басыңыз.
            </p>
          </div>
        </div>
      )}

      {/* 2. MAIN INVITATION SITE CONTENT */}
      {/* Keep wrapper fully active so search or indexing can handle seamlessly, revealed beautifully */}
      <div className={`transition-opacity duration-1000 ${isOpened ? "opacity-100" : "opacity-0"}`}>
        
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
              <RSVPForm wishText={wishText} onWishChange={setWishText} />
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
