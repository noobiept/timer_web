const electron = require( 'electron' );

const { app } = electron;
const { BrowserWindow } = electron;

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
let win;


function createWindow() {
        // Create the browser window.
    win = new BrowserWindow({
        title: 'Timer',
        width: 800,
        height: 600,
        minWidth: 550,
        minHeight: 250,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        },
        icon: `${__dirname}/random/icon128.png`
    });

        // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

        // Emitted when the window is closed.
    win.on('closed', () => {
            // De-reference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
        win = null;
    });
}


    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
app.on( 'ready', createWindow );

    // Quit when all windows are closed.
app.on( 'window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
    if ( process.platform !== 'darwin' ) {
        app.quit();
    }
});

app.on( 'activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
    if ( win === null ) {
        createWindow();
    }
});
