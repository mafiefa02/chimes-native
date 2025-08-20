// You can either use spawn or exec, the choice is often purely aesthetic,
// but spawn() doesn't spawn a shell, which is what we want here.
import { spawn } from 'node:child_process';

// On Windows we can offload the work to PowerShell:
const winFn = (filePath: string) =>
  spawn(`powershell`, [
    `-c`,
    `(`,
    `New-Object`,
    `Media.SoundPlayer`,
    `"${filePath}"`,
    `).PlaySync();`,
  ]);

// On MacOS, we have afplay available:
const macFn = (filePath: string) => spawn(`afplay`, [filePath]);

// And on everything else, i.e. linux/unix, we can use aplay, which comes
// preinstalled but doesn't play mp3 files, or we can use ffplay (the audio
// player that comes with ffmpeg), which does, but requires an install.
const ffplay = true;
const nxFn = (filePath: string) =>
  spawn(ffplay ? `ffplay` : `aplay`, [filePath]);

// Then, because your OS doesn't change during a script
// run, we can simply bind the single function we'll need
// as "play(filePath)":
const { platform: os } = process;
const playAudioFile = os === `win32` ? winFn : os === `darwin` ? macFn : nxFn;

export { playAudioFile };
