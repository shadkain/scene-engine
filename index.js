const { app, BrowserWindow } = require('electron');

/** @type {BrowserWindow} */
let win = null;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!win) {
        createWindow();
    }
});

/** Creates window instance */
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    
    win.loadFile('./dist/index.html');

    win.webContents.toggleDevTools();

    win.on('closed', () => {
        win = null;
    });
}