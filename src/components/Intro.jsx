import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/intro.css";

/**
 * Nour Youssef — Intro / preloader.
 * Plays once per browser session (see App.jsx). Reads as a comic title
 * card, not a corporate logo reveal: a halftone speed-line burst kicks in
 * behind the wordmark, the name SLAMS into place with a spring overshoot
 * (like a comic sound-effect impact), a caption box types out a line, and
 * a "POW" sticker pops in the corner. On exit the whole page tears apart
 * down the middle gutter and the two halves swing off screen — a comic
 * panel splitting open, not a smooth corporate wipe.
 */

const WORDS = ["NOUR", "YOUSSEF"];
const CAPTION = "Turning to issue 01 of ∞...";
const EASE = [0.65, 0, 0.2, 1];
const HOLD_MS = 2900; // time before the page tears open
const EXIT_MS = 900; // exit duration — keep in sync with the exit transition below

function IntroContent({ progress }) {
  return (
    <>
      <span className="panel-tick tl" aria-hidden="true" />
      <span className="panel-tick tr" aria-hidden="true" />
      <span className="panel-tick bl" aria-hidden="true" />
      <span className="panel-tick br" aria-hidden="true" />

      <motion.div
        className="intro-burst"
        initial={{ scale: 0, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 0.16 }}
        transition={{ duration: 0.7, ease: EASE }}
        aria-hidden="true"
      />

      <motion.div
        className="intro-pow"
        initial={{ scale: 0, rotate: 8, opacity: 0 }}
        animate={{ scale: 1, rotate: -10, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.55 }}
      >
        POW!
      </motion.div>

      <div className="intro-center">
        <h1 className="intro-wordmark" aria-label="Nour Youssef">
          {WORDS.map((word, wi) => (
            <motion.span
              className="intro-word"
              key={word}
              initial={{ scale: 2.6, opacity: 0, rotate: wi === 0 ? -5 : 4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 15,
                delay: 0.15 + wi * 0.16,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.span
          className="intro-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.55 }}
        />

        <motion.div
          className="intro-caption"
          initial={{ opacity: 0, y: 16, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.75 }}
        >
          {CAPTION}
        </motion.div>
      </div>

      <motion.div
        className="intro-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="intro-footer-label">OPENING PANEL</span>
        <span className="intro-counter">PG. {String(progress).padStart(3, "0")}</span>
      </motion.div>

      <div className="intro-progress-track" aria-hidden="true">
        <div className="intro-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </>
  );
}

export default function Intro({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tick = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      setProgress(Math.min(100, Math.round((elapsed / HOLD_MS) * 100)));
      if (elapsed < HOLD_MS) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const exitTimer = setTimeout(() => setVisible(false), HOLD_MS);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      onComplete?.();
    }, HOLD_MS + EXIT_MS);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  return (
    <div className="intro-stage" aria-hidden={!visible}>
      <AnimatePresence>
        {visible && [
          <motion.div
            key="left"
            className="intro-half intro-half--left halftone"
            style={{ clipPath: "inset(0 50% 0 0)" }}
            exit={{ x: "-100%", rotate: -3, transition: { duration: EXIT_MS / 1000, ease: EASE } }}
          >
            <IntroContent progress={progress} />
          </motion.div>,
          <motion.div
            key="right"
            className="intro-half intro-half--right halftone"
            style={{ clipPath: "inset(0 0 0 50%)" }}
            exit={{ x: "100%", rotate: 3, transition: { duration: EXIT_MS / 1000, ease: EASE } }}
          >
            <IntroContent progress={progress} />
          </motion.div>,
        ]}
      </AnimatePresence>
    </div>
  );
}