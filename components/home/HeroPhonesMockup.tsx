// Styled placeholder phone/extension screens.
//
// ┌─────────────────────────────────────────────────────────────────┐
// │ TO SWAP IN A REAL SCREENSHOT:                                     │
// │ 1. Drop the image in /public/screenshots/                        │
// │ 2. Pass its path to the phone in components/home/Hero.tsx, e.g.  │
// │      <PhoneCaughtSlipping src="/screenshots/caught-slipping.png" />│
// │ The styled mock below is shown automatically until you do.        │
// └─────────────────────────────────────────────────────────────────┘

import Image from "next/image";

/**
 * Device frame wrapper. Renders a real screenshot when `src` is provided,
 * otherwise falls back to the styled mock passed as children.
 */
function PhoneShell({
  src,
  alt,
  sizes,
  className,
  children,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full flex-col">{children}</div>
      )}
    </div>
  );
}

export function PhoneCaughtSlipping({ src }: { src?: string }) {
  return (
    <PhoneShell
      src={src}
      alt="CaughtSlipping app preview"
      sizes="188px"
      className="w-[188px] h-[340px] rounded-[22px] shadow-2xl ring-1 ring-white/10 bg-[#111111]"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-gradient-to-b from-[#F0B331]/20 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] text-[#F0B331]/60 uppercase tracking-widest font-mono">
            CaughtSlipping
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#F0B331] shadow-[0_0_8px_#F0B331] block" />
        </div>
        <div className="text-center py-1">
          <p
            className="text-[#F0B331] font-mono font-bold leading-none"
            style={{ fontSize: "2.25rem" }}
          >
            4:23
          </p>
          <p className="text-white/30 text-[8px] uppercase tracking-widest mt-1">
            hours today
          </p>
        </div>
        <div className="mt-2 text-center">
          <span className="text-[8px] uppercase tracking-widest bg-[#F0B331]/15 text-[#F0B331] px-2 py-0.5 rounded-full border border-[#F0B331]/20">
            😬 Shame Mode Active
          </span>
        </div>
      </div>

      {/* Daily limit bar */}
      <div className="px-4 py-2.5 border-t border-white/5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[8px] text-white/30 font-mono">Daily limit</span>
          <span className="text-[8px] text-[#F0B331]/60 font-mono">87%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F0B331] to-[#F0B331]/60"
            style={{ width: "87%" }}
          />
        </div>
      </div>

      {/* Site list */}
      <div className="flex-1 px-4 py-2 space-y-2.5 overflow-hidden">
        {[
          ["YouTube", "2h 14m", "65%"],
          ["X (Twitter)", "1h 02m", "30%"],
          ["Facebook", "0h 47m", "22%"],
        ].map(([site, time, pct]) => (
          <div key={site}>
            <div className="flex justify-between mb-1">
              <span className="text-[8px] text-white/40">{site}</span>
              <span className="text-[8px] text-white/25 font-mono">{time}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full">
              <div
                className="h-full bg-[#F0B331]/40 rounded-full"
                style={{ width: pct }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="h-6 rounded-full bg-[#F0B331]/10 border border-[#F0B331]/20 flex items-center justify-center">
          <span className="text-[7px] text-[#F0B331]/50 uppercase tracking-widest">
            Block until tomorrow
          </span>
        </div>
      </div>
    </PhoneShell>
  );
}

export function PhoneInSpiritInTruth({ src }: { src?: string }) {
  return (
    <PhoneShell
      src={src}
      alt="InSpiritInTruth app preview"
      sizes="210px"
      className="w-[210px] h-[410px] rounded-[28px] shadow-[0_32px_64px_rgba(0,0,0,0.4)] ring-1 ring-white/10 bg-[#0F1923]"
    >
      {/* Status bar */}
      <div className="h-7 bg-[#0F1923] flex items-center justify-between px-5">
        <span className="text-[8px] text-white/30 font-mono">9:41</span>
        <div className="flex gap-1">
          <span className="text-[8px] text-white/30">●</span>
          <span className="text-[8px] text-white/20">●</span>
          <span className="text-[8px] text-white/10">●</span>
        </div>
      </div>

      {/* Greeting header */}
      <div className="px-5 py-3 bg-gradient-to-b from-[#90A842]/22 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] text-[#90A842]/60 uppercase tracking-widest">
              Good morning
            </p>
            <p className="text-white font-semibold text-[12px] mt-0.5">
              Today&apos;s Reading
            </p>
          </div>
          <div className="h-6 w-6 rounded-full bg-[#F0B331]/20 flex items-center justify-center">
            <span className="text-[10px]">⚡</span>
          </div>
        </div>
      </div>

      {/* Devotional card */}
      <div className="mx-4 mt-1 rounded-xl overflow-hidden bg-[#1A2332] border border-[#90A842]/20">
        <div className="h-14 bg-gradient-to-br from-[#123524] to-[#0c2218] p-3">
          <p className="text-[7px] text-[#90A842]/50 uppercase tracking-widest">
            Devotional
          </p>
          <p className="text-white text-[10px] font-semibold mt-0.5 leading-snug">
            Walking in Quiet Faith
          </p>
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-full bg-white/10 rounded-full" />
          <div className="h-1.5 w-5/6 bg-white/10 rounded-full" />
          <div className="h-1.5 w-4/6 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Verse of the day */}
      <div className="mx-4 mt-3 rounded-xl bg-[#1A2332]/70 p-3 border-l-2 border-[#90A842]">
        <p className="text-[7px] text-[#90A842]/60 uppercase tracking-widest mb-1">
          Verse of the Day
        </p>
        <p className="text-[8px] text-white/60 leading-relaxed">
          &ldquo;Be strong and courageous. Do not be afraid...&rdquo;
        </p>
        <p className="text-[7px] text-[#90A842]/40 mt-1 font-mono">Joshua 1:9</p>
      </div>

      {/* Streak */}
      <div className="mx-4 mt-3 flex items-center gap-2">
        <span className="text-[8px] text-[#F0B331]/60">⚡ 14 day streak</span>
        <div className="flex-1 h-1 bg-white/5 rounded-full">
          <div className="h-full w-3/5 bg-[#F0B331]/35 rounded-full" />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-auto h-13 bg-[#0F1923] border-t border-white/5 flex items-center justify-around px-5 py-3">
        {["🏠", "📖", "⭐", "👤"].map((icon, i) => (
          <div
            key={i}
            className={`flex flex-col items-center ${i === 0 ? "opacity-100" : "opacity-25"}`}
          >
            <span className="text-base leading-none">{icon}</span>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

export function PhoneRecipeAI({ src }: { src?: string }) {
  return (
    <PhoneShell
      src={src}
      alt="RecipeAI app preview"
      sizes="188px"
      className="w-[188px] h-[340px] rounded-[22px] shadow-2xl ring-1 ring-black/10 bg-white"
    >
      {/* Status bar */}
      <div className="h-7 bg-[#CC5833] flex items-center justify-between px-4">
        <span className="text-[8px] text-white/70 font-mono">9:41</span>
        <div className="flex gap-1">
          <span className="text-[8px] text-white/60">●</span>
          <span className="text-[8px] text-white/40">●</span>
          <span className="text-[8px] text-white/20">●</span>
        </div>
      </div>

      {/* Header with search */}
      <div className="px-4 py-3 bg-gradient-to-b from-[#CC5833] to-[#CC5833]/5">
        <p className="text-white/70 text-[7px] uppercase tracking-widest mb-1.5">
          RecipeAI
        </p>
        <div className="h-6 bg-white/25 rounded-full flex items-center px-3 gap-1.5">
          <span className="text-[8px]">🔍</span>
          <span className="text-[8px] text-white/50">What&apos;s in your fridge?</span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-4 py-2.5">
        <p className="text-[7px] text-gray-400 uppercase tracking-widest mb-2">
          Your ingredients
        </p>
        <div className="flex flex-wrap gap-1">
          {["🍗 Chicken", "🍚 Rice", "🧄 Garlic", "+2"].map((item) => (
            <span
              key={item}
              className={`text-[7px] px-1.5 py-0.5 rounded-full border ${
                item === "+2"
                  ? "bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-[#CC5833]/10 text-[#CC5833] border-[#CC5833]/20"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Recipe result */}
      <div className="mx-4 rounded-xl border border-gray-100 bg-gray-50 p-3 flex-1">
        <p className="text-[7px] text-gray-400 uppercase tracking-widest mb-2">
          Recipe
        </p>
        <div className="h-2 w-3/4 bg-gray-200 rounded mb-1.5" />
        <div className="h-1.5 w-full bg-gray-100 rounded mb-1" />
        <div className="h-1.5 w-5/6 bg-gray-100 rounded mb-1" />
        <div className="h-1.5 w-2/3 bg-gray-100 rounded mb-3" />
        <div className="h-7 bg-[#CC5833] rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white font-medium">
            View full recipe →
          </span>
        </div>
      </div>
      <div className="h-4" />
    </PhoneShell>
  );
}
