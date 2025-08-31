const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  send: (ch, data) => ipcRenderer.send(ch, data),
  receive: (ch, fn) => ipcRenderer.on(ch, (e, ...args) => fn(...args))
});
