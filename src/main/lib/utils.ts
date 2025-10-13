import { BrowserWindow } from 'electron';
import { ChildProcess, spawn } from 'node:child_process';

/**
 * A platform-specific function for playing an audio file.
 *
 * This function is determined at runtime based on the host operating system,
 * providing a single, consistent interface for audio playback. It uses the most
 * appropriate native command-line utility for each platform.
 *
 * - **Windows**: Uses PowerShell's `Media.SoundPlayer`.
 * - **macOS**: Uses the `afplay` utility.
 * - **Linux/Other**: Uses the `ffplay` utility (requires FFmpeg to be installed).
 *
 * @param filePath The absolute path to the audio file to be played.
 * @returns A `ChildProcess` instance for the spawned command.
 * @see {@link https://stackoverflow.com/a/79286769}
 */
export const playAudioFile = ((): ((filePath: string) => ChildProcess) => {
  // On Windows, we can offload the work to PowerShell.
  const winFn = (filePath: string) =>
    spawn('powershell', [
      '-c',
      '(',
      'New-Object',
      'Media.SoundPlayer',
      `"${filePath}"`,
      ').PlaySync();',
    ]);

  // On macOS, the native `afplay` is available.
  const macFn = (filePath: string) => spawn('afplay', [filePath]);

  // On Linux/other Unix-like systems, we default to `ffplay` from FFmpeg.
  const nxFn = (filePath: string) => spawn('ffplay', [filePath]);

  // Determine the OS once and return the appropriate function.
  const os = process.platform;
  if (os === 'win32') return winFn;
  if (os === 'darwin') return macFn;
  return nxFn;
})();

/**
 * Sends a message to all active browser windows.
 * This utility function iterates over all created windows and sends the
 * specified IPC message to their renderer processes.
 */
export const sendToAllWindows = (channel: string, ...args: unknown[]): void => {
  const allWindows = BrowserWindow.getAllWindows();
  allWindows.forEach((window) => {
    window.webContents.send(channel, ...args);
  });
};
