import { useEffect, useRef } from 'react';

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
}

/**
 * Custom hook to handle audio playback using HTMLAudioElement.
 *
 * @param {string} src - The source URL of the audio file.
 * @param {UseSoundOptions} [options={}] - Optional settings for audio playback.
 * @property {number} [options.volume] - The volume level of the audio (0.0 to 1.0).
 * @property {boolean} [options.loop] - Whether the audio should loop continuously.
 *
 * @returns {Object} An object containing functions to control audio playback.
 * @returns {Function} play - Function to start playing the audio from the beginning.
 * @returns {Function} pause - Function to pause the audio playback.
 */

export const useSound = (src: string, options: UseSoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);

    if (options.volume !== undefined) {
      audioRef.current.volume = options.volume;
    }
    audioRef.current.loop = options.loop || false;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src, options.volume, options.loop]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return {
    play,
    pause,
  };
};
