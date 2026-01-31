import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { lang: 'Telugu', text: 'నమస్కారం', font: 'Noto Sans Telugu' },
  { lang: 'Hindi', text: 'नमस्ते', font: 'Noto Sans Devanagari' },
  { lang: 'Spanish', text: '¡Hola!', font: 'Inter' },
  { lang: 'Japanese', text: 'こんにちは', font: 'Noto Sans JP' },
  { lang: 'French', text: 'Bonjour', font: 'Inter' },
  { lang: 'German', text: 'Hallo', font: 'Inter' },
  { lang: 'Korean', text: '안녕하세요', font: 'Noto Sans KR' },
  { lang: 'Arabic', text: 'مرحبا', font: 'Noto Sans Arabic' },
  { lang: 'Russian', text: 'Привет', font: 'Noto Sans SC' },
  { lang: 'English', text: 'Hello', font: 'Inter' },
];

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    // Slightly faster: 0.2s fade in, 0.3s stay, 0.2s fade out = 0.7s per greeting
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(i => i + 1), 700);
      return () => clearTimeout(timer);
    } else if (index === greetings.length - 1) {
      // Wait a bit before zooming (no glow)
      const pauseBeforeZoom = setTimeout(() => setZooming(true), 600);
      // After zoom, finish intro
      const finishTimer = setTimeout(() => {
        setShow(false);
        setTimeout(onFinish, 150);
      }, 1200);
      return () => {
        clearTimeout(pauseBeforeZoom);
        clearTimeout(finishTimer);
      };
    }
  }, [index, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: zooming ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: zooming ? 1.2 : 0.6, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            key={greetings[index].text}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={
              zooming && index === greetings.length - 1
                ? { scale: 2.2, opacity: [1, 1, 0.8, 0], filter: 'none', transition: { duration: 1.1, ease: 'easeInOut' } }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              fontFamily: `${greetings[index].font}, Inter, sans-serif`,
              background: 'linear-gradient(90deg, #d3baff 0%, #a47dfb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: zooming ? '12vw' : '8vw',
              letterSpacing: '0.04em',
              textAlign: 'center',
              filter: 'none',
              transition: 'font-size 1.2s cubic-bezier(.77,0,.18,1)',
            }}
          >
            {greetings[index].text}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
