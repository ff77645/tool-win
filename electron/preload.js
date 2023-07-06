import {useLoading,domReady} from './helper'
import { ipcRenderer,contextBridge  } from 'electron'



// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady()
.then(appendLoading)

contextBridge.exposeInMainWorld('electron',{
  showOpenDialog:opt=>ipcRenderer.invoke('showOpenDialog',opt),
  fsReaddir:opt=>ipcRenderer.invoke('fsReaddir',opt),
  extractMetadata:opt=>ipcRenderer.invoke('extractMetadata',opt),
  compressImg:opt=>ipcRenderer.invoke('compressImg',opt),
})
window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
