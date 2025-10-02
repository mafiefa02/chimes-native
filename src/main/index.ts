import { initializeApp } from './lib/bootstrap';
import * as appConfigServices from './services/appConfig';
import * as notificationServices from './services/notifications';
import * as profileServices from './services/profiles';
import * as scheduleHistoryServices from './services/scheduleHistory';
import * as scheduleProfileServices from './services/scheduleProfiles';
import * as scheduleServices from './services/schedules';
import * as userSoundServices from './services/userSounds';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { app, shell, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

/**
 * Creates and configures the main application window.
 * This function sets up the window's dimensions, title, and web preferences,
 * including the preload script for bridging the main and renderer processes.
 * It also handles loading the appropriate content based on the environment
 * (development URL with HMR or production HTML file) and ensures external
 * links open in the default system browser.
 */
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1152,
    height: 670,
    minWidth: 1000,
    minHeight: 560,
    autoHideMenuBar: true,
    title: 'Chimes',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  // Show the window gracefully once it's ready.
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Security measure: open all external links in the user's default browser.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Load the renderer content, handling development and production environments.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

/**
 * This is the main entry point for the application. It waits until Electron is
 * fully initialized before performing startup tasks. This includes initializing
 * the application's core services, setting up all IPC listeners to handle
 * communication from the renderer process, and finally creating the main
 * application window.
 */
app.whenReady().then(async () => {
  // Run core application setup (database, services, etc.).
  await initializeApp();

  // Set a unique application ID for Windows notifications and taskbar behavior.
  electronApp.setAppUserModelId('com.chimes.app');

  // Automatically handle common keyboard shortcuts like DevTools (F12)
  // and reloading in development.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // --- IPC Handlers for Renderer-Main Communication ---

  // App Configuration
  ipcMain.on('appConfig:getSync', (event, key) => {
    event.returnValue = appConfigServices.getAppConfigProperty(key);
  });
  ipcMain.handle('appConfig:set', (_, key, value) => {
    appConfigServices.setAppConfigProperty(key, value);
  });

  // User Profiles
  ipcMain.handle('profiles:getAll', () => profileServices.getAllProfiles());
  ipcMain.handle('profiles:getById', (_, id) =>
    profileServices.getProfileById(id),
  );
  ipcMain.handle('profiles:create', (_, data) =>
    profileServices.createProfile(data),
  );
  ipcMain.handle('profiles:update', (_, id, data) =>
    profileServices.updateProfile(id, data),
  );
  ipcMain.handle('profiles:delete', (_, id) =>
    profileServices.deleteProfile(id),
  );

  // Schedule Profiles
  ipcMain.handle('scheduleProfiles:getByUser', (_, userId) =>
    scheduleProfileServices.getScheduleProfilesByUser(userId),
  );
  ipcMain.handle('scheduleProfiles:create', (_, data) =>
    scheduleProfileServices.createScheduleProfile(data),
  );
  ipcMain.handle('scheduleProfiles:update', (_, id, data) =>
    scheduleProfileServices.updateScheduleProfile(id, data),
  );
  ipcMain.handle('scheduleProfiles:delete', (_, id) =>
    scheduleProfileServices.deleteScheduleProfile(id),
  );

  // User Sounds
  ipcMain.handle('userSounds:getByUser', (_, userId) =>
    userSoundServices.getUserSounds(userId),
  );
  ipcMain.handle('userSounds:getBySoundId', (_, userId, soundId) =>
    userSoundServices.getUserSoundById(userId, soundId),
  );
  ipcMain.handle('userSounds:create', (_, data) =>
    userSoundServices.createUserSound(data),
  );
  ipcMain.handle('userSounds:update', (_, id, userId, data) =>
    userSoundServices.updateUserSound(id, userId, data),
  );
  ipcMain.handle('userSounds:delete', (_, id, userId) =>
    userSoundServices.deleteUserSound(id, userId),
  );

  // Schedules
  ipcMain.handle('schedules:getByProfile', (_, profileId) =>
    scheduleServices.getSchedulesByProfile(profileId),
  );
  ipcMain.handle('schedules:create', (_, data) =>
    scheduleServices.createSchedule(data),
  );
  ipcMain.handle('schedules:update', (_, id, data) =>
    scheduleServices.updateSchedule(id, data),
  );
  ipcMain.handle('schedules:delete', (_, id) =>
    scheduleServices.deleteSchedule(id),
  );

  // Schedule History
  ipcMain.handle('scheduleHistory:getBySchedule', (_, scheduleId) =>
    scheduleHistoryServices.getHistoryBySchedule(scheduleId),
  );
  ipcMain.handle('scheduleHistory:create', (_, data) =>
    scheduleHistoryServices.createScheduleHistoryEntry(data),
  );

  // Notifications
  ipcMain.handle('notifications:getByUser', (_, userId) =>
    notificationServices.getNotificationsByUser(userId),
  );
  ipcMain.handle('notifications:create', (_, data) =>
    notificationServices.createNotification(data),
  );
  ipcMain.handle('notifications:update', (_, id, data) =>
    notificationServices.updateNotification(id, data),
  );
  ipcMain.handle('notifications:delete', (_, id) =>
    notificationServices.deleteNotification(id),
  );

  // Create the main window after all setup is complete.
  createWindow();

  // Handle macOS-specific behavior for re-creating a window.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/**
 * Handles the 'window-all-closed' event. It quits the application on all
 * platforms except macOS, where it is standard for an application to remain
 * active until the user explicitly quits.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
