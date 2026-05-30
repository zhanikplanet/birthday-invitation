import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Heart } from "lucide-react";

export default function RSVPForm() {
  const [userName, setUserName] = useState("");
  const [attendance, setAttendance] = useState("Әрине, келемін");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const options = [
    "Әрине, келемін",
    "Жұбайыммен келемін",
    "Өкінішке орай, келе алмаймын",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError("Аты-жөніңізді жазуды ұмытпаңыз");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName.trim(),
          attending: attendance,
          wishing: "",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Жауапты жіберу сәтсіз аяқталды");
      }
    } catch (err) {
      setError("Желілік қосылым қатесі, қайта жіберіп көріңіз");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full flex flex-col items-center py-12 px-6 bg-emerald-50/40 rounded-2xl border border-emerald-500/20 shadow-sm text-center">
        <CheckCircle className="w-14 h-14 text-emerald-600 mb-4 animate-[scaleUp_0.4s_ease-out]" />
        <h4 className="font-display text-xl sm:text-2xl text-emerald-900 font-bold mb-2">
          Жауабыңыз жіберілді!
        </h4>
        <p className="text-xs sm:text-sm text-[#465A4C] leading-relaxed max-w-sm mb-6">
          Берген жауабыңызға үлкен рақмет! Кенжегүл анамыздың мерейтойында сізді асыға күтеміз! 🌟
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setUserName("");
          }}
          className="px-6 py-2.5 rounded-xl border border-emerald-300 font-sans text-xs font-semibold text-emerald-800 hover:bg-emerald-100/50 transition-colors cursor-pointer"
        >
          ЖАҢА ЖАУАП ЖАЗУ
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-4 sm:px-8 bg-[#FAF6EE]/50 rounded-2xl border border-amber-900/10 shadow-sm relative overflow-hidden">
      {/* Elegant Frame Outline */}
      <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-900/5 rounded-xl pointer-events-none" />

      <div className="flex flex-col items-center mb-8 relative z-10 text-center">
        <Heart className="w-6 h-6 text-amber-600 fill-amber-500/10 mb-2 animate-pulse" />
        <span className="font-sans font-semibold tracking-widest text-[#5C4D3C] text-xs uppercase mb-1">
          Жауап Жазу
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-amber-900 font-medium">
          Мерейтойға Қатысуыңызды Растаңыз
        </h3>
        <p className="text-[10px] sm:text-xs text-amber-800/60 mt-1 max-w-xs">
          Қатысуыңызды алдын ала хабарлауыңызды өтінеміз
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-6">
        {/* Name input */}
        <div>
          <label className="block text-xs font-semibold text-amber-900/70 uppercase tracking-widest mb-2 font-sans">
            Аты-жөніңіз:
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-white text-[#4A3B2C] placeholder-[#C0B5A3] text-sm rounded-xl border border-amber-900/10 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium transition-all"
            placeholder="Мысалы: Дархан мен Айгерім"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <span className="block text-[10px] text-amber-800/40 mt-1.5 leading-normal">
            *Есімдеріңізді толық немесе жұбайыңызбен келетін болсаңыз, бірге жазуыңызды сұраймыз.
          </span>
        </div>

        {/* Radio option group */}
        <div>
          <span className="block text-xs font-semibold text-amber-900/70 uppercase tracking-widest mb-3 font-sans">
            Мерейтойға қатысу жоспарыңыз:
          </span>
          <div className="flex flex-col gap-2.5">
            {options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  attendance === opt
                    ? "bg-white border-amber-600 shadow-sm"
                    : "bg-white/40 border-amber-900/5 hover:border-amber-300"
                }`}
              >
                <input
                  type="radio"
                  name="attendanceOption"
                  className="w-4 h-4 text-amber-600 bg-[#FAF6EE] border-gray-300 focus:ring-amber-500 accent-amber-600 focus:outline-none"
                  checked={attendance === opt}
                  onChange={() => setAttendance(opt)}
                />
                <span className="text-xs sm:text-sm font-medium text-[#4A3B2C] font-sans">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white font-sans font-bold tracking-widest py-3.5 px-6 rounded-xl text-sm shadow-md hover:brightness-[1.05] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>ЖАУАПТЫ ЖІБЕРУ</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
