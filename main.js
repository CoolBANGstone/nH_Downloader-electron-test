const {
    app,
    BrowserWindow,
    dialog
} = require('electron');
const url = require('url');
const path = require('path');
const request = require('request');
const {autoUpdater} = require('electron-updater');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // darwin = MacOS
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.on('ready', function()  {
    if (process.platform === 'win32') {
        autoUpdater.autoDownload = false;
        autoUpdater.checkForUpdatesAndNotify();
    }
});

function createWindow() {
    // Create the browser window.
    var transparent = process.platform === 'darwin';
    win = new BrowserWindow({
        width: 400,
        height: 400,
        maximizable: false,
        transparent: transparent,
        backgroundColor: "#404040",
        webPreferences: {
            nodeIntegration: true
        }
    });


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open DevTools.
    // win.webContents.openDevTools()
    if (process.platform !== 'darwin') {
        win.removeMenu();
    }
    // When Window Close.
    win.on('closed', () => {
        win = null;
    })
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('download-folder', app.getPath('downloads'));
    })
    // Check new version
    
}

console.log();
