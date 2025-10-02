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

function createWindow(): void {
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await initializeApp();

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.chimes.app');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  ipcMain.on('appConfig:getSync', (event, key) => {
    event.returnValue = appConfigServices.getAppConfigProperty(key);
  });
  ipcMain.handle('appConfig:set', (_, key, value) => {
    appConfigServices.setAppConfigProperty(key, value);
  });

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

  ipcMain.handle('scheduleHistory:getBySchedule', (_, scheduleId) =>
    scheduleHistoryServices.getHistoryBySchedule(scheduleId),
  );
  ipcMain.handle('scheduleHistory:create', (_, data) =>
    scheduleHistoryServices.createScheduleHistoryEntry(data),
  );

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

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
