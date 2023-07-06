import { app, BrowserWindow,ipcMain,protocol } from 'electron'
import path from 'node:path'
import {
  showOpenDialog,
  fsReaddir,
  extractMetadata,
  compressImg
} from './ipc-hander'

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  win.webContents.openDevTools()
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(()=>{
  createWindow()
  protocol.registerFileProtocol('image',(req,callback)=>{
    const url = req.url.substring(8)
    return callback(decodeURIComponent(url))
  })
  ipcMain.handle('showOpenDialog',showOpenDialog)
  ipcMain.handle('fsReaddir',fsReaddir)
  ipcMain.handle('extractMetadata',extractMetadata)
  ipcMain.handle('compressImg',compressImg)
})
