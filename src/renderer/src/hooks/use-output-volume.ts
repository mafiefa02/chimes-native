import { useState, useEffect, useCallback } from 'react';

interface UseOutputVolume {
  volume: number;
  setVolume: (volume: number) => void;
  audioContext: AudioContext | null;
  masterGainNode: GainNode | null;
}

/**
 * Manages the master output volume for the application using the Web Audio API.
 *
 * @returns An object containing the current volume, a function to set the volume,
 *          the global AudioContext, and the master GainNode.
 */
export function useOutputVolume(): UseOutputVolume {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [masterGainNode, setMasterGainNode] = useState<GainNode | null>(null);
  const [volume, setInternalVolume] = useState<number>(1); // Default volume is 100%

  useEffect(() => {
    const context = new window.AudioContext();
    const gainNode = context.createGain();
    gainNode.connect(context.destination);

    setAudioContext(context);
    setMasterGainNode(gainNode);

    return () => {
      context.close().catch(console.error);
    };
  }, []);

  const setVolume = useCallback(
    (newVolume: number) => {
      if (masterGainNode && audioContext) {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        masterGainNode.gain.setValueAtTime(
          clampedVolume,
          audioContext.currentTime,
        );
        setInternalVolume(clampedVolume);
      }
    },
    [audioContext, masterGainNode],
  );

  return { volume, setVolume, audioContext, masterGainNode };
}
