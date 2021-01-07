/**
 * Entry point for electron app
 */
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, Accelerator, MenuItem } from 'electron';
import * as path from 'path';
import * as url from 'url';

const isMac = process.platform === 'darwin'
let browserWindows: BrowserWindow[] = [];
let mainWindow: BrowserWindow | null;

function createWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            webSecurity: true,
            devTools: process.env.NODE_ENV === 'production' ? false : true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        browserWindows = [];
    });
    browserWindows.push(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
console.log(app.name)
app.setName('My App')
console.log(app.name)
const menuTemplate: MenuItemConstructorOptions[] = [
    // { role: 'appMenu' }
    ...((isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            {
                label: 'Preferences',
                accelerator: 'CommandOrControl+,',
                click: (item: MenuItem, win: BrowserWindow, e: KeyboardEvent) => {
                    const configWindow = new BrowserWindow({
                        title: "Config",
                        height: 600,
                        width: 800,
                        webPreferences: {
                            webSecurity: false,
                            devTools: process.env.NODE_ENV === 'production' ? false : true,
                            preload: path.join(__dirname, 'preload.js')
                        }
                    });

                    // and load the index.html of the app.
                    configWindow.loadURL(
                        url.format({
                            pathname: path.join(__dirname, './config.html'),
                            protocol: 'file:',
                            slashes: true
                        })
                    );

                    // Emitted when the window is closed.
                    configWindow.on('closed', () => {
                        // Dereference the window object, usually you would store windows
                        // in an array if your app supports multi windows, this is the time
                        // when you should delete the corresponding element.
                        mainWindow = null;
                        browserWindows = browserWindows.filter((win: BrowserWindow) => win != configWindow);
                    });
                    browserWindows.push(configWindow);
                }
            },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []) as MenuItemConstructorOptions[]),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...((isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                    { role: 'close' }
                ]) as MenuItemConstructorOptions[])
        ]
    }
]
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);