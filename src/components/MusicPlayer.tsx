'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

interface MusicPlayerProps {
  /** Override the audio URL (e.g., from admin config) */
  audioUrl?: string;
}

export default function MusicPlayer({ audioUrl }: MusicPlayerProps) {
  const src = audioUrl || INVITATION_CONFIG.musicUrl;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(true);
  const [interacted, setInteracted] = useState(false);

  /* Update progress bar */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoad);
    audio.addEventListener('ended', () => { if (!loop) setPlaying(false); });
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoad);
    };
  }, [loop]);

  /* Volume */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  /* Loop */
  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    setInteracted(true);
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }, [playing, src]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  function fmt(s: number) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  /* No music configured yet */
  if (!src) {
    return (
      <div className="music-player">
        <motion.button
          className="music-player__btn"
          whileHover={{ scale: 1.08 }}
          title="No music configured"
          onClick={() => setOpen(o => !o)}
          aria-label="Music player"
        >
          🎵
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              className="music-player__panel"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <p className="music-player__title" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
                No music configured yet.<br />Set a music URL in the Admin Dashboard.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="music-player">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      <motion.button
        className={`music-player__btn${playing ? ' is-playing' : ''}`}
        whileHover={{ scale: 1.08 }}
        animate={playing ? { boxShadow: ['0 0 0px rgba(193,102,59,0)', '0 0 20px rgba(193,102,59,0.35)', '0 0 0px rgba(193,102,59,0)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => { setOpen(o => !o); if (!interacted) togglePlay(); }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '♫' : '♩'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="music-player__panel"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          >
            <div className="music-player__title">Wedding Music 🎵</div>

            {/* Controls */}
            <div className="music-player__controls">
              {/* Loop */}
              <button
                onClick={() => setLoop(l => !l)}
                title="Toggle loop"
                style={{ opacity: loop ? 1 : 0.4, fontSize: '0.9rem' }}
              >
                🔁
              </button>
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                style={{
                  width: 36, height: 36,
                  border: '1px solid var(--gold)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: 'var(--gold)',
                  flex: '0 0 auto',
                }}
              >
                {playing ? '⏸' : '▶'}
              </button>
              {/* Mute */}
              <button onClick={() => setMuted(m => !m)} title={muted ? 'Unmute' : 'Mute'}>
                {muted ? '🔇' : '🔊'}
              </button>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginLeft: 'auto' }}>
                {fmt(progress)} / {fmt(duration)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="music-player__progress-wrap">
              <input
                className="music-player__progress"
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={progress}
                onChange={seek}
                aria-label="Seek"
                style={{
                  background: `linear-gradient(to right, var(--gold) ${(progress / (duration || 100)) * 100}%, rgba(255,255,255,0.1) 0)`,
                }}
              />
            </div>

            {/* Volume */}
            <div className="music-player__volume">
              <span className="music-player__volume-icon">{muted ? '🔇' : '🔈'}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
                aria-label="Volume"
                style={{
                  background: `linear-gradient(to right, var(--gold) ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.1) 0)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
