"use client";

// Floating circular app avatars (logo + rotating gradient ring) that
// "introduce themselves" to each other in a looping group chat. Replaces the
// static phone-screen mockups in the hero. Desktop-only — the hero hides this
// column below `lg`.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SpeakerId = "caughtslipping" | "inspiritintruth" | "tapa";

interface Speaker {
  id: SpeakerId;
  name: string;
  icon: string;
  accent: string;
  /** Fill behind the logo (most logos sit on white; the dark wordmark needs a dark fill). */
  avatarBg: string;
  /** Conic gradient that circles the avatar — dominant brand colour, mixed with accents. */
  gradient: string;
  /** Float class hook (gsap targets these). */
  floatClass: string;
  ringDuration: string;
  /** Avatar position within the composition box. */
  avatar: React.CSSProperties;
  /** Speech-bubble slot + which side its tail points to. */
  bubble: React.CSSProperties;
  tail: "left" | "right";
}

const SPEAKERS: Record<SpeakerId, Speaker> = {
  caughtslipping: {
    id: "caughtslipping",
    name: "CaughtSlipping",
    icon: "/icons/caught-slipping.png",
    accent: "#F0B331",
    avatarBg: "#ffffff",
    gradient:
      "conic-gradient(from 0deg, #F0B331, #FFE2A0, #F0B331, #CC5833, #90A842, #F0B331)",
    floatClass: "chat-float-a",
    ringDuration: "8s",
    avatar: { left: 8, top: 40 },
    bubble: { left: 100, top: 26, maxWidth: 250 },
    tail: "left",
  },
  inspiritintruth: {
    id: "inspiritintruth",
    name: "InSpiritInTruth",
    icon: "/icons/inspiritintruth-dark.png",
    accent: "#90A842",
    avatarBg: "#0C2218",
    gradient:
      "conic-gradient(from 90deg, #90A842, #C8DE86, #90A842, #123524, #F0B331, #90A842)",
    floatClass: "chat-float-b",
    ringDuration: "11s",
    avatar: { right: 8, top: 208 },
    bubble: { right: 100, top: 196, maxWidth: 248 },
    tail: "right",
  },
  tapa: {
    id: "tapa",
    name: "tapa.",
    icon: "/icons/tapa.png",
    accent: "#CC5833",
    avatarBg: "#ffffff",
    gradient:
      "conic-gradient(from 200deg, #CC5833, #F4A982, #CC5833, #F0B331, #90A842, #CC5833)",
    floatClass: "chat-float-c",
    ringDuration: "9.5s",
    avatar: { left: 44, top: 372 },
    bubble: { left: 132, top: 360, maxWidth: 232 },
    tail: "left",
  },
};

const ORDER: SpeakerId[] = ["caughtslipping", "inspiritintruth", "tapa"];

interface Line {
  speaker: SpeakerId;
  text: string;
}

const SCRIPT: Line[] = [
  // ── Introductions (they're meeting in the same studio) ──
  {
    speaker: "caughtslipping",
    text: "Right — introductions, since we keep landing in the same studio. I'm CaughtSlipping. I track where your work hours actually go, and call you out when you slip. 👀",
  },
  {
    speaker: "tapa",
    text: "hi hi 👋 i'm tapa. i take the daily 'what's for dinner?' off your plate — tell me what's in the fridge and i hand back a real recipe.",
  },
  {
    speaker: "inspiritintruth",
    text: "And I'm InSpiritInTruth. I keep your faith close — a weekly devotional, AI ones for whatever you're carrying, and the whole Bible. 🤍",
  },
  // ── Banter / value props ──
  {
    speaker: "caughtslipping",
    text: "Good. Now that that's settled — you've been 'just checking' for 47 minutes. I counted. I'll say it out loud if I have to.",
  },
  {
    speaker: "tapa",
    text: "and? some of us are busy turning a sad fridge into actual dinner so people can, you know, live. 😮‍💨",
  },
  {
    speaker: "inspiritintruth",
    text: "Easy, you two. Not every minute has to be earned — some are just meant to be still. 🤍",
  },
  {
    speaker: "caughtslipping",
    text: "Still? I track work hours too. You, my friend, have been 'resting' since Tuesday.",
  },
  {
    speaker: "tapa",
    text: "rude. i saved three recipes AND fed the whole group chat last night. that's called range, babe.",
  },
  {
    speaker: "inspiritintruth",
    text: "I gave someone a verse to hold onto today. See? We all hand people their time back.",
  },
  {
    speaker: "caughtslipping",
    text: "I guard it. Strictly. Someone around here has to.",
  },
  {
    speaker: "tapa",
    text: "i make it taste good. effortlessly. 🍳",
  },
  {
    speaker: "inspiritintruth",
    text: "And I help it mean something. ✨",
  },
  {
    speaker: "caughtslipping",
    text: "...fine. One family, three jobs. Built For The Rest Of Us. 🌿",
  },
];

const TYPING_MS = 950;
const HOLD_MS = 2900;

export default function HeroAppChat() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  // Latest line shown per speaker (persists so the group chat stays populated).
  const [lines, setLines] = useState<Partial<Record<SpeakerId, string>>>({});

  // ── Conversation loop ──
  useEffect(() => {
    if (reduced) {
      // Static fallback: show each app's intro line, no cycling.
      const intro: Partial<Record<SpeakerId, string>> = {};
      for (const line of SCRIPT) {
        if (!intro[line.speaker]) intro[line.speaker] = line.text;
      }
      setLines(intro);
      setTyping(false);
      return;
    }

    const current = SCRIPT[step];
    setTyping(true);

    const revealId = window.setTimeout(() => {
      setLines((prev) => ({ ...prev, [current.speaker]: current.text }));
      setTyping(false);
    }, TYPING_MS);

    const advanceId = window.setTimeout(() => {
      setStep((s) => (s + 1) % SCRIPT.length);
    }, TYPING_MS + HOLD_MS);

    return () => {
      window.clearTimeout(revealId);
      window.clearTimeout(advanceId);
    };
  }, [step, reduced]);

  // ── Entrance + gentle float ──
  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chat-avatar",
        { opacity: 0, scale: 0.6, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "back.out(1.5)",
          delay: 0.45,
          onComplete() {
            gsap.to(".chat-float-a", {
              y: -12,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
            gsap.to(".chat-float-b", {
              y: -9,
              duration: 4.6,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: 0.6,
            });
            gsap.to(".chat-float-c", {
              y: -11,
              duration: 4.1,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: 1.1,
            });
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const activeSpeaker = SCRIPT[step].speaker;

  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* Accessible summary — the animated chat itself is decorative. */}
      <p className="sr-only">
        Three apps from the studio banter like a family: CaughtSlipping, the
        strict one, tracks where your work hours really go and calls you out;
        tapa. takes the daily &ldquo;what&apos;s for dinner&rdquo; off your
        plate; and InSpiritInTruth gives your faith a weekly devotional and the
        whole Bible. All built for real people.
      </p>

      <div aria-hidden="true" className="absolute inset-0">
        {ORDER.map((id) => {
          const s = SPEAKERS[id];
          const isActive = id === activeSpeaker;
          const text = lines[id];
          const showTyping = isActive && typing && !reduced;
          const tailColor = isActive ? `${s.accent}66` : "var(--color-border)";

          return (
            <div key={id}>
              {/* ── Avatar: logo + rotating gradient ring ── */}
              <div
                className={`chat-avatar ${s.floatClass} absolute opacity-0`}
                style={{ ...s.avatar }}
              >
                <div
                  className="relative transition-transform duration-500"
                  style={{
                    width: 80,
                    height: 80,
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {/* Soft accent glow */}
                  <div
                    className="absolute -inset-2 rounded-full blur-xl transition-opacity duration-500"
                    style={{
                      background: s.accent,
                      opacity: isActive ? 0.5 : 0.22,
                    }}
                  />
                  {/* Spinning conic-gradient disc (the ring) */}
                  <div
                    className="animate-ring-spin absolute inset-0 rounded-full"
                    style={{
                      background: s.gradient,
                      animationDuration: s.ringDuration,
                    }}
                  />
                  {/* Logo, masking the centre and leaving the gradient ring */}
                  <div
                    className="absolute inset-[3px] overflow-hidden rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                    style={{ background: s.avatarBg }}
                  >
                    <Image
                      src={s.icon}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* ── Speech bubble ── */}
              {(text || showTyping) && (
                <div
                  className="absolute"
                  style={{ ...s.bubble }}
                  key={showTyping ? `${id}-typing` : `${id}-${text}`}
                >
                  <div
                    className="animate-bubble-in relative rounded-2xl border bg-surface px-4 py-2.5 shadow-[0_10px_30px_-12px_rgba(18,53,36,0.35)] transition-shadow duration-500"
                    style={{
                      borderColor: isActive
                        ? `${s.accent}66`
                        : "var(--color-border)",
                      boxShadow: isActive
                        ? `0 12px 34px -12px ${s.accent}66`
                        : undefined,
                    }}
                  >
                    {/* Tail — rotated square with only the two outer edges
                        coloured, so it reads as a pointer toward the avatar.
                        Uses the `border-color` shorthand only (4-value string)
                        to avoid mixing shorthand/longhand across re-renders. */}
                    <span
                      className="absolute h-3 w-3 rotate-45 border bg-surface"
                      style={{
                        top: 16,
                        left: s.tail === "left" ? -6 : undefined,
                        right: s.tail === "right" ? -6 : undefined,
                        // top right bottom left
                        borderColor:
                          s.tail === "left"
                            ? `transparent transparent ${tailColor} ${tailColor}`
                            : `transparent ${tailColor} ${tailColor} transparent`,
                      }}
                    />
                    <p
                      className="mb-0.5 font-heading text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: s.accent }}
                    >
                      {s.name}
                    </p>
                    {showTyping ? (
                      <span className="flex items-center gap-1 py-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="animate-typing-dot h-1.5 w-1.5 rounded-full"
                            style={{
                              background: s.accent,
                              animationDelay: `${i * 0.18}s`,
                            }}
                          />
                        ))}
                      </span>
                    ) : (
                      <p className="text-[13px] leading-snug text-ink">
                        {text}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
