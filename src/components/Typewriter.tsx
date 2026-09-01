"use client";
import { useState, useEffect } from "react";

const phrases = [
  "an Interior Designer",
  "a Visual Thinker",
  "a Space Planner",
  "a Forever Student"
];

export function Typewriter() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, 50);
      }
    } else {
      if (text === currentPhrase) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="inline-block">
      {text}
      <span className="animate-[pulse_1s_infinite] ml-[2px] opacity-70 -translate-y-[2px] inline-block">|</span>
    </span>
  );
}
